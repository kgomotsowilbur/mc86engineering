export default function Dotbox() {
    return(
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 8px)",
                gridTemplateRows: "repeat(15, 8px)",
                gap: "23px",
                padding: "24px",
                width: "fit-content",
            }}
            >
            {Array.from({ length: 60 }, (_, i) => (
                <div
                key={i}
                style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: `
                    radial-gradient(
                        circle at 35% 35%,
                        #F1F3ED 0%,
                        #79924F 35%,
                        #435426 65%,
                        #16181D 100%
                    )
                    `,
                    boxShadow: `
                    0 4px 12px #16181D,
                    inset 0 -3px 6px #79924F
                    `,
                    position: "relative",
                    overflow: "hidden",
                }}
                >
                {/* Specular highlight */}
                <div
                    style={{
                    position: "absolute",
                    top: "18%",
                    left: "22%",
                    width: "30%",
                    height: "22%",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
                    transform: "rotate(-30deg)",
                    filter: "blur(1px)",
                    }}
                />
                </div>
            ))}
        </div>
    )
}