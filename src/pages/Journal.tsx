import { useEffect } from "react";
import { useAuthStore } from '../lib/authStore';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import CreateJournal from "./CreateJournal";
import { getUserJournals } from "../lib/journalApi";
import { Link, useNavigate } from "react-router-dom";

function Journal({ onJournalAdded }: { onJournalAdded?: () => void }) {
    const user = useAuthStore((state) => state.user);
    const tab = useAuthStore((state) => state.tab);
    const setTab = useAuthStore((state) => state.setTab);
    const journals = useAuthStore((state) => state.journals);
    const setJournals = useAuthStore((state) => state.setJournals);
    const loading = useAuthStore((state) => state.journalsLoading);
    const setLoading = useAuthStore((state) => state.setJournalsLoading);
    const navigate = useNavigate();

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
    }, [user, tab, setJournals, setLoading]);    return (
        <div className="w-full flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 py-8">
            {user ? (
                <Tabs value={tab} onValueChange={setTab} className="w-full max-w-5xl">
                    <TabsList className="flex justify-center mb-6">
                        <TabsTrigger value="journal">Journals</TabsTrigger>
                        <TabsTrigger value="create">Create Journal</TabsTrigger>
                    </TabsList>

                    <TabsContent value="journal">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                            Your Travel Journals ✈️
                        </h1>

                        {loading ? (
                            <div className="text-center text-muted-foreground">Loading...</div>
                        ) : journals.length === 0 ? (
                            <div className="text-center text-muted-foreground">No journals yet.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                
                                {
                                    journals.map((journal: any) => (
                                    <div
                                        key={journal.id}
                                        onClick={()=> navigate(`/journal/${journal.id}`)}
                                        className="rounded-3xl bg-muted border border-border shadow-2xl p-4 hover:scale-[1.02] transition-all duration-300 ease-in-out group"
                                    >                                        {/* Image Preview */}
                                        {journal.imageSections?.length > 0 && (
                                            <div className="relative h-44 w-full mb-4 rounded-xl overflow-hidden">
                                                <img
                                                    src={journal.imageSections[0].urls ? journal.imageSections[0].urls[0] : journal.imageSections[0].url}
                                                    alt="Cover"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                                />
                                                <div className="absolute bottom-2 left-2 bg-background/70 px-2 py-1 text-xs rounded-md shadow">
                                                    {journal.imageSections.reduce((total: number, section: any) => 
                                                        total + (section.urls ? section.urls.length : 1), 0
                                                    )} photo{journal.imageSections.reduce((total: number, section: any) => 
                                                        total + (section.urls ? section.urls.length : 1), 0
                                                    ) > 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        )}

                                        {/* Journal Info */}
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg sm:text-xl font-semibold text-foreground line-clamp-2">
                                                {journal.title}
                                            </h3>

                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>📅 <span className="font-medium">Start:</span> {journal.startDate?.toDate?.().toLocaleDateString?.() || journal.startDate}</p>
                                                <p>📅 <span className="font-medium">End:</span> {journal.endDate?.toDate?.().toLocaleDateString?.() || journal.endDate}</p>
                                                <p>⏱️ <span className="font-medium">Uploaded:</span> {journal.createdAt?.toDate?.().toLocaleString?.() || journal.createdAt}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="create">
                        <CreateJournal onJournalAdded={() => { setTab("journal"); if (onJournalAdded) onJournalAdded(); }} />
                    </TabsContent>
                </Tabs>
            ) : (
                <div className="min-h-[88vh] w-full bg-background flex items-center justify-center px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-10">                        {/* Left: Illustration */}
                        <div className="flex-1 flex items-center justify-center">
                            <img
                                src="https://res.cloudinary.com/dbzbqq0vw/image/upload/v1748797872/Key-rafiki_kx7vcl.svg"
                                alt="Travelers Illustration"
                                className="w-64 sm:w-80 md:w-96 h-auto hover:scale-105 transition-transform duration-300  object-contain"
                            />
                        </div>
                        {/* Right: Sign in prompt */}
                        <div className="flex-1 flex flex-col items-start justify-center gap-6 text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                                Sign in please !!
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center items-center max-md:w-full">
                                <Link
                                    to="/login"
                                    className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
                                >
                                    Sign In
                                </Link>
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
