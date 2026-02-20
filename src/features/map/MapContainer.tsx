import { MapSvg } from "./MapSvg";
import { useDrag } from "../../shared/hooks/useDrag"
import { useState } from "react";
import { UploadExcelModal } from "../modals/UploadExcelModal";
import { type Reservation } from "../../shared/types/types";

interface MapContainerProps {
    onFacilityClick: (facilityId: string) => void;
    reservations: Reservation[];
    isAdmin: boolean;
}

export function MapContainer({ onFacilityClick, reservations, isAdmin }: MapContainerProps) {

    const MAP_WIDTH = 2500;
    const MAP_HEIGHT = 1700;

    const VIEW_WIDTH = window.innerWidth;
    const VIEW_HEIGHT = window.innerHeight;

    const minX = VIEW_WIDTH - MAP_WIDTH;
    const maxX = 0;

    const minY = VIEW_HEIGHT - MAP_HEIGHT;
    const maxY = 0;

    const bounds = {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
    };

    const drag = useDrag(bounds);

    const [showUpload, setShowUpload] = useState(false);

    return (
        <>
            <div className="w-screen h-screen overflow-hidden">
                <div
                    {...drag.bind}
                    style={{
                    transform: `translate(${drag.x}px, ${drag.y}px)`
                    }}
                >
                    <MapSvg
                        didDrag={drag.didDrag}
                        isAdmin={isAdmin}
                        onAdminOpen={() => setShowUpload(true)}
                        onFacilityClick={onFacilityClick}
                        reservations={reservations}
                    />
                </div>
            </div>
            <UploadExcelModal 
                    open={showUpload}
                    onClose={() => setShowUpload(false)}
            />
        </>
    );
}