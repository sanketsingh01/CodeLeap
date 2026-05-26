"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function CobeGlobe({
    className
}) {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		let globe = null;
		let rafId = 0;
		let phi = 0;

		const init = () => {
			const side = canvas.offsetWidth;
			if (side === 0 || globe) {
				return;
			}

			const dpr = Math.min(window.devicePixelRatio || 1, 2);

			globe = createGlobe(canvas, {
				devicePixelRatio: dpr,
				width: side,
				height: side,
				phi: 0,
				theta: 0,
				dark: 1,
				diffuse: 1.2,
				mapSamples: 16_000,
				mapBrightness: 6,
				baseColor: [0.3, 0.3, 0.3],
				markerColor: [0.1, 0.8, 1],
				glowColor: [1, 1, 1],
				markers: [
					{ location: [37.7595, -122.4367], size: 0.03 },
					{ location: [40.7128, -74.006], size: 0.1 },
				],
			});

			const loop = () => {
				globe?.update({ phi });
				phi += 0.008;
				rafId = requestAnimationFrame(loop);
			};
			loop();
		};

		let ro = null;

		if (canvas.offsetWidth > 0) {
			init();
		} else {
			ro = new ResizeObserver((entries) => {
				if (
					entries[0]?.contentRect.width &&
					entries[0]?.contentRect.width > 0
				) {
					ro?.disconnect();
					ro = null;
					init();
				}
			});
			ro.observe(canvas);
		}

		return () => {
			ro?.disconnect();
			cancelAnimationFrame(rafId);
			globe?.destroy();
		};
	}, []);

	return (
        <canvas
            className={className}
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }} />
    );
}
