import { create } from "zustand";

interface ImageSection {
  imageFiles: File[];
  description: string;
}

interface JournalCreationState {
  // Form fields
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  imageSections: ImageSection[];
  
  // UI states
  loading: boolean;
  error: string;

  // Actions
  setTitle: (title: string) => void;
  setLocation: (location: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setImageSections: (sections: ImageSection[]) => void;
  addImageSection: () => void;
  updateImageSection: (index: number, field: keyof ImageSection, value: any) => void;
  removeImageSection: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  
  // Reset form
  resetForm: () => void;
}

const initialState = {
  title: "",
  location: "",
  startDate: "",
  endDate: "",
  imageSections: [],
  loading: false,
  error: "",
};

export const useJournalStore = create<JournalCreationState>((set, get) => ({
  ...initialState,

  // Setters
  setTitle: (title) => set({ title }),
  setLocation: (location) => set({ location }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setImageSections: (imageSections) => set({ imageSections }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Image section management
  addImageSection: () => {
    const { imageSections } = get();
    set({ 
      imageSections: [...imageSections, { imageFiles: [], description: "" }] 
    });
  },

  updateImageSection: (index, field, value) => {
    const { imageSections } = get();
    const updatedSections = [...imageSections];
    
    if (field === 'imageFiles') {
      updatedSections[index].imageFiles = value;
    } else if (field === 'description') {
      updatedSections[index].description = value;
    }
    
    set({ imageSections: updatedSections });
  },

  removeImageSection: (index) => {
    const { imageSections } = get();
    const updatedSections = imageSections.filter((_, i) => i !== index);
    set({ imageSections: updatedSections });
  },

  // Reset form to initial state
  resetForm: () => set(initialState),
}));
