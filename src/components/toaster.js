import { Toaster } from "react-hot-toast";

export default function Toasts() {
    return (
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
                background: "#00000",
                color: "#fffff",
            },
            // Default options for specific types
            success: {
                icon: "🚀",
                // className:"bg-ldgray",
                style: {
                fontSize: 22,
                background: "#282828",
                color: "white",
                },
            },
            error: {
                icon: "⚠️",
                style: {
                fontSize: 22,
                background: "#FF386B",
                color: "white",
                },
            },
            }}
        />
    )
}