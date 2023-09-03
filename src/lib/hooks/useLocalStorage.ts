import { createStorage, IStorageProperties } from "../server";

const useLocalStorage = <T = string>(props: IStorageProperties<T>) => {
	return createStorage<T>("localStorage", "useLocalStorage")(props);
};
export default useLocalStorage;
