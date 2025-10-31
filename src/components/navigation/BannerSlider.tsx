import React, { useEffect, useState, useRef } from "react";

const banners = [
    {
        image: "/banners/banner1.webp",
        link: "/dailytarot",
    },
    {
        image: "/banners/banner2.webp",
        link: "/dreamanimal",
    },
    {
        image: "/banners/banner3.webp",
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

    const handleClick = (link: string) => {
        window.location.href = link;
    };

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
                        <img
                            key={banner.image}
                            src={banner.image}
                            alt=""
                            width={400} 
                            height={133}
                            onClick={() => handleClick(banner.link)}
                            className="w-full h-32 sm:h-56 md:h-64 object-cover cursor-pointer shrink-0 select-none"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerSlider;