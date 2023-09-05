import isEqual from "lodash/isEqual";

declare const UNDEFINED_VOID_ONLY: unique symbol;
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type DependencyList = ReadonlyArray<unknown>;
type ServerEffectCallback = () => void | Destructor;

export function createServerEffect(effect: ServerEffectCallback, deps?: DependencyList) {
	console.log("Creating effect");
	let cleanup: void | Destructor;
	let depValues: DependencyList | undefined; // Declare depValues

	const cleanupEffect = () => {
		console.log("cleanupEffect");

		if (cleanup) {
			console.log(cleanup);
			cleanup();
		}
	};

	const runEffect = () => {
		console.log("runEffect");
		cleanupEffect();
		cleanup = effect();
	};

	const hasDependenciesChanged = () => {
		console.log(JSON.stringify(depValues) !== JSON.stringify(deps));
		return JSON.stringify(depValues) !== JSON.stringify(deps);
		return !isEqual(depValues, deps);
	};

	const updateEffectIfChanged = () => {
		console.log("Updating effect if changed");
		if (hasDependenciesChanged()) {
			cleanupEffect();
			runEffect();
			depValues = deps?.slice(); // Update depValues with the new dependencies
		}
	};

	if (!deps) {
		console.log("without deps");
		runEffect();
	} else {
		console.log("with deps");
		const initialDeps = deps.slice();
		console.log(initialDeps);
		depValues = initialDeps; // Initialize depValues with initial dependencies
		console.log(depValues);

		const unsubscribe = () => {
			console.log("unsubscribe");
			updateEffectIfChanged();
		};

		runEffect();
		return unsubscribe;
	}
}

export default createServerEffect;
