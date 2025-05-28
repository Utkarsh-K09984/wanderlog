import { useEffect, useState } from "react";
import { useAuthStore } from '../lib/authStore';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import CreateJournal from "./CreateJournal";
import { getUserJournals } from "../lib/journalApi";

function Journal({ onJournalAdded }: { onJournalAdded?: () => void }) {
    const user = useAuthStore((state) => state.user);
    const [tab, setTab] = useState("journal");
    const [journals, setJournals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchJournals() {
            if (user) {
                setLoading(true);
                try {
                    const data = await getUserJournals(user.uid);
                    setJournals(data);
                } catch (e) {
                    setJournals([]);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchJournals();
    }, [user, tab]);

    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-start px-4 md:px-8 pt-8">
            {user ? (
                <Tabs value={tab} onValueChange={setTab} className="w-full max-w-3xl">
                    <TabsList className="flex justify-center mb-6">
                        <TabsTrigger value="journal">Journals</TabsTrigger>
                        <TabsTrigger value="create">Create Journal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="journal">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                                Your Travel Journals
                            </h1>

                            {loading ? (
                                <div className="text-center text-muted-foreground">Loading...</div>
                            ) : journals.length === 0 ? (
                                <div className="text-center text-muted-foreground">No journals yet.</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {journals.map((journal) => (
                                    <div
                                    key={journal.id}
                                    className="rounded-2xl bg-card border shadow-xl overflow-hidden hover:scale-[1.01] transition-all"
                                    >
                                    {/* Overlapping Image Preview */}
                                    {journal.imageUrls?.length > 0 && (
                                        <div className="relative h-40 w-full">
                                        {journal.imageUrls.slice(0, 3).map((url, index) => (
                                            <img
                                            key={index}
                                            src={url}
                                            alt={`journal-img-${index}`}
                                            className={`absolute h-32 w-32 object-cover rounded-xl border-2 border-white shadow-md ${
                                                index === 0
                                                ? "left-0 z-30"
                                                : index === 1
                                                ? "left-12 z-20"
                                                : "left-24 z-10"
                                            }`}
                                            style={{ top: "10px" }}
                                            />
                                        ))}
                                        </div>
                                    )}

                                    {/* Text Section */}
                                    <div className="p-4 flex flex-col gap-2 mt-6">
                                        <div className="font-bold text-lg line-clamp-2 text-foreground">
                                        {journal.description}
                                        </div>

                                        <div className="text-sm text-muted-foreground">
                                        📅 <span className="font-medium">Start:</span>{" "}
                                        {journal.startDate?.toDate?.().toLocaleDateString?.() ||
                                            journal.startDate}
                                        </div>

                                        <div className="text-sm text-muted-foreground">
                                        📅 <span className="font-medium">End:</span>{" "}
                                        {journal.endDate?.toDate?.().toLocaleDateString?.() ||
                                            journal.endDate}
                                        </div>

                                        <div className="text-xs text-muted-foreground mt-1">
                                        ⏱️ Uploaded:{" "}
                                        {journal.createdAt?.toDate?.().toLocaleString?.() ||
                                            journal.createdAt}
                                        </div>
                                    </div>
                                    </div>
                                ))}
                                </div>
                            )}
                            </TabsContent>

                    <TabsContent value="create">
                        <CreateJournal onJournalAdded={() => { setTab("journal"); if (onJournalAdded) onJournalAdded(); }}/>                    </TabsContent>
                </Tabs>
            ) : (
                <div className="min-h-[80vh] w-full bg-background flex items-center justify-center px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-10">
                        {/* Left: Illustration */}
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-[340px] h-[260px] bg-primary/10 rounded-full flex items-center justify-center">
                                <img
                                    src="https://undraw.co/api/illustrations/undraw_traveling_yhxq.svg"
                                    alt="Travel Illustration"
                                    className="w-60 h-60 object-contain"
                                />
                            </div>
                        </div>
                        {/* Right: Sign in prompt */}
                        <div className="flex-1 flex flex-col items-start justify-center gap-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                                Sign in please !!
                            </h1>
                            <div className="flex gap-4 mt-2">
                                <a
                                    href="/login"
                                    className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
                                >
                                    Sign In
                                </a>
                                <a
                                    href="/about"
                                    className="px-6 py-2 rounded-md border border-border text-foreground font-semibold hover:bg-accent transition"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Journal;