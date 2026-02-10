import { useThemeHook } from "./useThemeHook"

export default function Background() {
    const { theme } = useThemeHook()
    if (theme === "light") {
        return (
            <div
                className="absolute inset-0 z-[-2]"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #FFFFFF 50%, #E0E7FF 100%)",
                }}
            />
        )
    }
    return (
        <div
            className="absolute inset-0 z-[-2]"
            style={{
                background: "radial-gradient(125% 125% at 50% 100%, #1E1E1E 50%, #172554 100%)",
            }}
        />
    )
}
