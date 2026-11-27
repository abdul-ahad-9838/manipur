
"use client";

import { useState } from "react";

export default function ProgramCardImage({ src, alt, icon }) {
    const [imageError, setImageError] = useState(false);

    return (
        <>
            {src && !imageError && (
                <img
                    src={src}
                    alt={alt || "Program"}
                    loading="lazy"
                    className="sp-program-cover-image"
                    onError={() => setImageError(true)}
                />
            )}

            {(!src || imageError) && (
                <div className="sp-cover-fallback">
                    <span>{icon || "🎓"}</span>
                </div>
            )}
        </>
    );
}
