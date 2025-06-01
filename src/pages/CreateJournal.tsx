import { addJournal } from "../lib/journalApi";
import { useAuthStore } from "../lib/authStore";
import { useJournalStore } from "../lib/journalStore";
import { uploadImageToCloudinary } from "../lib/cloundinary";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

const JournalForm = ({ onJournalAdded }: { onJournalAdded?: () => void }) => {
  // Get states and actions from Zustand stores
  const currentUser = useAuthStore((state) => state.user);
    const {
    title,
    location,
    startDate,
    endDate,
    imageSections,
    loading,
    error,
    setTitle,
    setLocation,
    setStartDate,
    setEndDate,
    addImageSection,
    updateImageSection,
    removeImageSection,
    setLoading,
    setError,
    resetForm,
  } = useJournalStore();

  const handleImageChange = (index: number, fileList: FileList | null) => {
    const files = fileList ? Array.from(fileList) : [];
    updateImageSection(index, 'imageFiles', files);
  };

  const handleDescriptionChange = (index: number, description: string) => {
    updateImageSection(index, 'description', description);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert("User not found");
    setLoading(true);
    setError("");    try {
      const imageUrlsWithDescriptions = [];
      
      // Group images by description
      const descriptionGroups = new Map<string, string[]>();
      
      for (const section of imageSections) {
        const urls = [];
        // Upload all images in this section
        for (const file of section.imageFiles) {
          const url = await uploadImageToCloudinary(file);
          if (url) {
            urls.push(url);
          } else {
            setError("One or more images failed to upload. Please try again.");
            setLoading(false);
            return;
          }
        }
        
        // Group URLs by description
        if (urls.length > 0) {
          if (descriptionGroups.has(section.description)) {
            // Add to existing description group
            const existingUrls = descriptionGroups.get(section.description)!;
            descriptionGroups.set(section.description, [...existingUrls, ...urls]);
          } else {
            // Create new description group
            descriptionGroups.set(section.description, urls);
          }
        }
      }
      
      // Convert grouped data to the format expected by the API
      for (const [description, urls] of descriptionGroups) {
        imageUrlsWithDescriptions.push({ urls, description });
      }

      const description = imageSections.map(section => section.description).join("\n");      await addJournal({ title, location, description, startDate, endDate, imageSections: imageUrlsWithDescriptions });
      resetForm(); // Reset form using Zustand store method
      if (onJournalAdded) onJournalAdded();
      alert("Journal added!");
    } catch (err: any) {
      setError(err.message || "Failed to add journal");
    } finally {
      setLoading(false);
    }
  };  return (
      <Card className="max-w-xl mx-auto mt-10 mb-20 shadow-xl rounded-2xl ">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            Create New Journal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Title input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter journal title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>

            {/* Location input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>

            {/* Date inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Image sections */}
            <div className="space-y-6">
              {imageSections.map((section, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 border p-4 rounded-md relative transition-all duration-300 ease-in-out hover:shadow-md"
                >
                  {imageSections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageSection(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold transition-colors duration-200"
                      aria-label="Remove section"
                    >
                      ×
                    </button>
                  )}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`image-${index}`}>Images</Label>
                    <Input
                      id={`image-${index}`}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageChange(index, e.target.files)}
                      className="text-sm sm:text-base"
                    />
                    {section.imageFiles.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {section.imageFiles.length} file(s) selected
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Enter image description..."
                      value={section.description}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      required
                      className="text-sm sm:text-base min-h-[100px]"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addImageSection}
                className="w-full text-sm sm:text-base transition-all duration-200 hover:bg-primary/90"
              >
                Add Image Section
              </Button>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium transition-opacity duration-300">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full text-sm sm:text-base">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Journal"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
  );
};

export default JournalForm;
