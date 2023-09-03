import { Context, FC, useContext } from "react";

const useSafeContext = <C>(context: Context<C | null>, hookName?: `${string}()`, provider?: FC) => {
	const safeContext = useContext<C | null>(context);
	
	const providerName = provider?.name.toString() ?? "ContextProvider";
	hookName = hookName ?? "useContext()";

	if (!safeContext) throw new Error(`${hookName} must be used within a ${providerName}`);

	return safeContext;
};

export default useSafeContext;
