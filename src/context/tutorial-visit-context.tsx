import React from "react";

type Visits = Record<string, boolean | undefined>;

type TutorialVisitContextType = {
  visited: Visits;
  setVisited: (id: string) => void;
};

const TutorialVisitContext = React.createContext<TutorialVisitContextType>({
  visited: {},
  setVisited: () => undefined,
});

const KEY = "uc-tutorial-visits";

export const TutorialVisitProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [visited, setVisits] = React.useState<Visits>({});

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored) setVisits(JSON.parse(stored));
    } catch {}
  }, []);

  const setVisited = React.useCallback((id: string) => {
    setVisits((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return (
    <TutorialVisitContext.Provider value={{ visited, setVisited }}>
      {children}
    </TutorialVisitContext.Provider>
  );
};

export const useTutorialVisits = () => React.useContext(TutorialVisitContext);
