// Module-level singleton — index.tsx assigns show/hide once,
// any scroll view anywhere in the app can call them with zero overhead.
const tabBarControls = {
    show: () => {},
    hide: () => {},
};

export default tabBarControls;
