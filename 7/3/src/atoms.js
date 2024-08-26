import { atom, selector } from "recoil";

export const newtorkAtom = atom({
    key: "newtorkAtom",
    default: 110,
})

export const jobAtom = atom({
    key: "jobAtom",
    default: 10,
})

export const notificationAtom = atom({
    key: "notificationAtom",
    default: 10,
})

export const messageAtom = atom({
    key: "messageAtom",
    default: 10,
})

export const totalNotificationAtom = selector({
    key: "totalNotificationAtom",
    get: ({ get }) => {
        const newtorkAtomCount = get(newtorkAtom);
        const jobAtomCount = get(jobAtom);
        const messageAtomCount = get(messageAtom);
        const notificationAtomCount = get(notificationAtom);
        return newtorkAtomCount + jobAtomCount + messageAtomCount + notificationAtomCount;
    }
})

// we have to use selector for async data
// we can't use atom for async data
// in this way we can async inside atom
export const asyncTotalNotificationAtom = atom({
    key: "asyncTotalNotificationAtom",
    default: selector({
        key: "asyncTotalNotificationAtom/Default",
        get: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
            const data = await response.json();
            return data;
        }
    })
})

// atomFamily
export const atomFamily = atomFamily({
    key: "atomFamily",
    default: id => {
        return id + 1;
        // return TODO.find(todo => todo.id === id);
        // https://recoiljs.org/docs/api-reference/utils/atomFamily/
    }
})

// selectorFamily
export const todosAtomFamily = atomFamily({
    key: "todosAtomFamily",
    default: todosAtomFamily({
        key: "todosAtomFamily/Default",
        get: (id) => async ({ get }) => {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
            return res.data.todo;
        }
    })
})

// useRecoilStateLoadable
// useRecoilValueLoadable
// gives an object {state, contents, error}
// state: loading, hasError, hasValue
// contents: value, error
// by if(state === "hasValue") {contents.value}
// else if(state === "hasError") {contents.error}
// else if(state === "loading") {loading...}