// Application context - provides global state for applications and user plan
import { createContext, useContext, useState, type ReactNode, useCallback, useRef } from "react";

export type Status = "Draft" | "Applied" | "Under Review" | "Closed";
export type UserPlan = "free" | "premium";

export interface Application {
  id: string;
  applicationName: string;
  status: Status;
  role: string;
  company: string;
  jobDescription: string;
  notes: string;
  resumeName: string;
  coverLetterName: string;
  url: string;
  createdDate: string;
  updatedDate: string;
}

interface ApplicationContextType {
  applications: Application[];
  addApplication: () => string;
  deleteApplication: (id: string) => void;
  updateApplication: (id: string, fields: Partial<Omit<Application, "id">>) => void;
  getApplication: (id: string) => Application | undefined;
  userPlan: UserPlan;
  setUserPlan: (plan: UserPlan) => void;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

const seedApplications: Application[] = [
  {
    id: "1",
    applicationName: "Application 1",
    status: "Draft",
    role: "",
    company: "",
    jobDescription: "",
    notes: "",
    resumeName: "Anna_Smith_Resume_2025.pdf",
    coverLetterName: "",
    url: "",
    createdDate: "Jan 8, 2025",
    updatedDate: "Jan 10, 2025",
  },
];

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>(seedApplications);
  const [userPlan, setUserPlan] = useState<UserPlan>("free");
  const counterRef = useRef(1); // global counter, never resets

  const addApplication = useCallback(() => {
    counterRef.current += 1;
    const id = Date.now().toString();
    const now = new Date();
    const updatedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const newApp: Application = {
      id,
      applicationName: `Application ${counterRef.current}`,
      status: "Draft",
      role: "",
      company: "",
      jobDescription: "",
      notes: "",
      resumeName: "",
      coverLetterName: "",
      url: "",
      createdDate: updatedDate,
      updatedDate,
    };
    setApplications((prev) => [newApp, ...prev]);
    return id;
  }, []);

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const updateApplication = useCallback((id: string, fields: Partial<Omit<Application, "id">>) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...fields } : a))
    );
  }, []);

  const getApplication = useCallback(
    (id: string) => applications.find((a) => a.id === id),
    [applications]
  );

  return (
    <ApplicationContext.Provider value={{ applications, addApplication, deleteApplication, updateApplication, getApplication, userPlan, setUserPlan }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error("useApplications must be used within ApplicationProvider");
  return ctx;
};
