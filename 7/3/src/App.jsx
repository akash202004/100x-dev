import { useMemo, useState } from "react";
import "./App.css";
import { useRecoilValue } from "recoil";
import {
  jobAtom,
  messageAtom,
  newtorkAtom,
  notificationAtom,
  totalNotificationAtom,
} from "./atoms";

function App() {
  const newtorkAtomCount = useRecoilValue(newtorkAtom);
  const jobAtomCount = useRecoilValue(jobAtom);
  const messageAtomCount = useRecoilValue(messageAtom);
  const notificationAtomCount = useRecoilValue(notificationAtom);
  const totalNotificationAtomCount = useRecoilValue(totalNotificationAtom);

  const totalNoti = useMemo(() => {
    return (
      newtorkAtomCount + jobAtomCount + messageAtomCount + notificationAtomCount
    );
  }, [newtorkAtomCount, jobAtomCount, messageAtomCount, notificationAtomCount]);

  return (
    <>
      <button>
        My Network ({newtorkAtomCount >= 100 ? "99+" : newtorkAtomCount})
      </button>
      <button>Jobsk ({jobAtomCount >= 100 ? "99+" : jobAtomCount})</button>
      <button>
        Messaging ({messageAtomCount >= 100 ? "99+" : messageAtomCount})
      </button>
      <button>
        Notifications (
        {notificationAtomCount >= 100 ? "99+" : notificationAtomCount})
      </button>

      <button>Me ({totalNoti})</button>
    </>
  );
}

export default App;
