import React, { useEffect, useState, useRef } from "react";

const banners = [
    {
        image: "/banners/banner3_2x.webp",
        link: "/dailytarot",
    },
    {
        image: "/banners/banner2_2x.webp",
        link: "/dreamanimal",
    },
    {
        image: "/banners/banner1_2x.webp",
        link: "/luckywestzodiac",
    },
];

const TRANSITION_DURATION_MS = 500;
const BannerSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const slidesToRender = [...banners, { ...banners[0], id: "clone-first" }];

    const transitionTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {

            setCurrentIndex((prev) => prev + 1);
        }, 3000);

        return () => {
            clearInterval(interval);
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (currentIndex === banners.length) {
            transitionTimeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, TRANSITION_DURATION_MS);
        }

        if (currentIndex === 0 && !isTransitioning) {
            setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
        }
    }, [currentIndex, isTransitioning]);

    return (
        <section className="w-full flex justify-center">
            <div className="w-full max-w-3xl overflow-hidden">
                <div
                    className="flex ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,

                        transitionDuration: isTransitioning ? `${TRANSITION_DURATION_MS}ms` : "0ms",
                    }}
                >
                    {slidesToRender.map((banner) => (
                        <a
                            key={banner.image}
                            href={banner.link}
                            rel="noopener noreferrer"
                            className="w-full shrink-0 select-none"
                        >
                            <img
                                src={banner.image}
                                alt={banner.image}
                                width={800}
                                height={266}
                                className="w-full h-32 sm:h-56 md:h-64 object-cover"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerSlider;