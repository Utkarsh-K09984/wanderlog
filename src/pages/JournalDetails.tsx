import { useParams } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";
import { useState, useEffect } from "react";
import{Location08Icon} from "hugeicons-react";
import { ArcherContainer, ArcherElement } from 'react-archer';

// Image Section Component to handle individual section state
function ImageSection({ section, sectionIndex }: { section: { urls?: string[]; url?: string; description: string }; sectionIndex: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionImages = section.urls || [section.url];
  
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sectionImages.length);
  };
  
  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sectionImages.length) % sectionImages.length);
  };
  
  return (
    <>
    {(sectionIndex % 2 === 0 && window.innerWidth > 700) ? 
    (
    <div className="my-[3rem] flex flex-col md:flex-row gap-8 items-center border-y border-y-prmary py-[0.5rem] ">
      {/* Image Slider */}
      <div className="relative w-full max-w-[40vw] max-md:max-w-[80vw] aspect-[3/2] my-[2rem]">
        <img
          src={sectionImages[currentImageIndex]}
          alt={`Section ${sectionIndex + 1} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
          />
        {sectionImages.length > 1 && (
            <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-l hover:bg-opacity-70"
              >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-r hover:bg-opacity-70"
              >
              ›
            </button>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded">
              {currentImageIndex + 1} / {sectionImages.length}
            </div>
          </>
        )}
      </div>

      {/* Description */}
      <div className="flex-1 text-lg text-center md:text-left">
        <p className="underline">
          {section.description}
        </p>
      </div>
    </div>
    ):
    <div className="my-[3rem] flex flex-col md:flex-row gap-8 items-center border-y border-y-prmary py-[0.5rem] ">
      {/* Image Slider */}
      <div className="flex-1 text-lg text-center md:text-right">
        <p className="underline">
          {section.description}
        </p>
      </div>
      <div className="relative w-full max-w-[40vw] max-md:max-w-[80vw] aspect-[3/2] ">
        <img
          src={sectionImages[currentImageIndex]}
          alt={`Section ${sectionIndex + 1} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
          />
        {sectionImages.length > 1 && (
            <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-l hover:bg-opacity-70"
              >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-r hover:bg-opacity-70"
              >
              ›
            </button>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded">
              {currentImageIndex + 1} / {sectionImages.length}
            </div>
          </>
        )}
      </div>

      {/* Description */}
    </div>
    
    }
</>
  );
}

function AllDetails() {
  const { id } = useParams<{ id: string }>();
  const journals = useAuthStore((state) => state.journals);
  const journal = journals.find((j) => j.id === id);
  
  // State for responsive arrow direction
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMediumScreen(window.innerWidth < 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  if (!journal) {
    return <div className="text-center mt-10">Journal not found</div>;
  }
  
  return (
    <>

    <div className="max-w-[95vw] mt-[2rem] pb-[0.1rem] mx-auto pt-[4.375rem] px-[1rem] shadow-[8px_0_15px_-3px,_-8px_0_15px_-3px] shadow-primary/30 rounded-lg bg-background font-handwritten line-match">

      <h1 className="text-center font-bold text-6xl max-md:text-3xl max-md:mt-[1rem] border-y border-y-border py-[0.5rem]">{journal.title}</h1>

      <p className="flex items-center justify-center gap-2 text-center mt-[2rem] text-4xl max-md:text-xl max-md:mt-[1rem] border-y border-y-border py-[0.1rem] ">
        <span className="inline-flex items-center"><Location08Icon className="w-8 h-8" /></span> {journal.location}
      </p>
            
        <div className="relative mt-[3rem]  max-md:mt-[1rem] px-0 sm:px-8 ">
        <ArcherContainer strokeColor="#3b6eff" strokeWidth={2} endMarker={true}>
            <div className="flex justify-between items-center text-lg relative z-10 max-md:flex-col">      <ArcherElement
                id="start"
                relations={[
                {
                    targetId: "end",
                    targetAnchor: isMediumScreen ? "top" : "left",
                    sourceAnchor: isMediumScreen ? "bottom" : "right",
                    style: { strokeColor: "#3b6eff", strokeWidth: 2, endMarker: true , strokeDasharray: "5,5"    },
                },    
            ]}            >
                <div className="p-2 rounded border border-dashed border-primary bg-background max-md:mb-[5rem]">
                  <div className="text-center">
                    <div className="text-sm font-medium">From</div>
                    <div className="text-xs">{journal.startDate?.toDate?.().toLocaleDateString?.() || journal.startDate}</div>
                  </div>
                </div>
            </ArcherElement>

            <ArcherElement id="end">
                <div className="p-2 rounded border border-dashed border-primary bg-background">
                  <div className="text-center">
                    <div className="text-sm font-medium">To</div>
                    <div className="text-xs">{journal.endDate?.toDate?.().toLocaleDateString?.() || journal.endDate}</div>
                  </div>
                </div>
            </ArcherElement></div>
        </ArcherContainer>
        </div>
          {/* Image sections */}
      {journal.imageSections && journal.imageSections.map((section: { urls?: string[]; url?: string; description: string }, sectionIndex: number) => (
        <ImageSection key={sectionIndex} section={section} sectionIndex={sectionIndex} />
      ))}
    </div>
    </>
  );
}

export default AllDetails;
