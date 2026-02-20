import { type Reservation } from "../../shared/types/types";
import { isReservedAt } from "../../shared/utils/reservationUtils";

type MapSvgProps = {
  didDrag: React.RefObject<boolean>;
  isAdmin: boolean;
  onAdminOpen: () => void;
  onFacilityClick: (facilityId: string) => void;
  reservations: Reservation[];
};

export function MapSvg({ didDrag, isAdmin, onAdminOpen, onFacilityClick, reservations }: MapSvgProps) {
    function handleClick(id: string) {
      if (didDrag.current) return;
      onFacilityClick(id);
    }
    function handleAdminClick() {
      if (didDrag.current) return;
      onAdminOpen();
    }

    function getFacilityColor(facilityId: string): string {
      const now = new Date();
      const reserved = isReservedAt(facilityId, now, reservations);
      return reserved ? '#F5AF4E' : '#90FF8C';
    }

    function getTextColor(facilityId: string): string {
      const now = new Date();
      const reserved = isReservedAt(facilityId, now, reservations);
      return reserved ? '#553801' : '#036C00';
    }

    function getStatusText(facilityId: string): string {
      const now = new Date();
      const reserved = isReservedAt(facilityId, now, reservations);
      return reserved ? 'Reservado' : 'Disponible';
    }

    return (
        <svg
        viewBox="0 0 637 437"
        className="w-625 h-auto font-map"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_3)">
          <rect width="637" height="437" fill="#1E305C" />
          <ellipse cx="-50" cy="100.5" rx="125" ry="149.5" fill="#DB7500"/>
          <text y="110" fill="#553801" fontSize="17" fontWeight="bold" style={{ userSelect: "none" }}>BLOQUE</text>
          <text x="30" y="130" fill="#553801" fontSize="17" fontWeight="bold" style={{ userSelect: "none" }}>X</text>

          <rect x="257" y="298" width="40" height="76" fill="#DB7500" />
          <text x="277" y="330" textAnchor="middle" fill="#553801" fontSize="5" fontWeight="bold" style={{ userSelect: "none" }}>Restaurante</text>
          <text x="277" y="340" textAnchor="middle" fill="#553801" fontSize="5" fontWeight="bold" style={{ userSelect: "none" }}>'Chiringuito'</text>
          <rect x="305" y="250" width="11" height="190" fill="#DB7500" />
          <rect x="305" y="-15" width="11" height="125" fill="#DB7500" />
          <rect x="610" y="-15" width="11" height="385" fill="#DB7500" />
          <path d="M610.863 365L621 370L586.049 447.778L576 443.304L610.863 365Z" fill="#DB7500"/>
          <rect x="56" y="399" width="173" height="7" fill="#DB7500" />
          <rect x="50" y="323.5" width="7" height="82.5" fill="#DB7500" />
          <rect x="231.2" y="443.737" width="44.2485" height="7" transform="rotate(-102 231.2 443.737)" fill="#DB7500" />
          <rect x="264.2" y="442.737" width="44.2485" height="7" transform="rotate(-102 264.2 442.737)" fill="#DB7500" />

          {/* ADMIN */}
          <g onClick={isAdmin ? handleAdminClick : undefined} className={isAdmin ? "cursor-pointer hover:opacity-80 transition-opacity" : "cursor-default"}>
            <rect x="266.2" y="419.737" width="37.897" height="20.1617" rx={isAdmin ? 4 : 0} stroke={isAdmin ? "black": 'none'} transform="rotate(-102 266.2 419.737)" fill={isAdmin ? "#0F1252" : "#DB7500"}/>
            {isAdmin && (
              <text
                x="230"
                y="408"
                transform="rotate(55 268 425)"
                fill="#464DED"
                fontSize="5"
                fontWeight="bold"
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                Administración
              </text>
            )}
          </g>

          {/* Gimnasio */}
          <g onClick={() => handleClick('Gimnasio')} className="cursor-pointer group">
            <g filter="url(#filterg)">
              <rect x="268" y="268" width="34" height="18" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-gym" x="275" y="270" width="100" height="100" />
              <text x="285" y="284" textAnchor="middle" fill='#000' fontSize="6" fontWeight="bold" style={{ userSelect: "none" }}>Gimnasio</text>
            </g>
            <rect x="267.5" y="267.5" width="35" height="19" fill={getFacilityColor('Gimnasio')} rx={4} stroke="black" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="285" y="279" textAnchor="middle" fill={getTextColor('Gimnasio')} fontSize="6" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Gimnasio')}</text>
          </g>

          <rect y="323.5" width="22" height="45" fill="#DB7500"/>

          
          {/* Pista atlética */}
          <g onClick={() => handleClick('Pista atlética')} className="cursor-pointer group">
            <path
              d="M458.5 -80H464.5C536.021 -80 594 -22.0209 594 49.5V318.5C594 390.021 536.021 448 464.5 448H458.5C386.979 448 329 390.021 329 318.5V49.5C329 -22.0209 386.979 -80 458.5 -80Z"
              stroke="#FC937C" strokeWidth="26"
            />
            <rect x="316" y="310" width="26" height="130" fill="#FC937C" />
            <rect x="316" y="360" width="26" height="77" fill="#7493E0" rx={4} stroke="black" />
            <use href="#icon-atletismo" x="319" y="369" width="20" height="20" />
            <text x="321" y="400" fill='#000' fontSize="5" fontWeight="bold" style={{ userSelect: "none" }}>Pista</text>
            <text x="318" y="407" fill='#000' fontSize="5" fontWeight="bold" style={{ userSelect: "none" }}>Atlética</text>
            <rect x="315.5" y="359.5" width="27" height="78" rx={4} stroke="black" fill={getFacilityColor('Pista atlética')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="329" y="400" textAnchor="middle" fill={getTextColor('Pista atlética')} fontSize="4" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Pista atlética')}</text>
            <rect x="316" y="310" width="26" height="2" fill="#FFF"/>
          </g>

          {/* Estadio */}
          <g onClick={() => handleClick('Estadio')} className="cursor-pointer group">
            <g filter="url(#filtere)">
              <rect x="268" y="101" width="48" height="158" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-estadio" x="272" y="130" width="40" height="40" />
              <text x="292" y="200" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>Estadio</text>
              <text x="292" y="210" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>Universitario</text>
            </g>
            <rect x="267.5" y="100.5" width="49" height="159" rx={4} stroke="black" fill={getFacilityColor('Estadio')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="292" y="180" textAnchor="middle" fill={getTextColor('Estadio')} fontSize="8" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Estadio')}</text>
          </g>

          {/* Futbol 11 */}
          <g onClick={() => handleClick('Futbol 11')} className="cursor-pointer group">
            <g filter="url(#filterf11)">
              <rect x="350" y="17" width="223" height="334" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-futbol" x="426" y="80" width="70" height="70" />
              <text x="461.5" y="220" textAnchor="middle" fill='#000' fontSize="22" fontWeight="bold" style={{ userSelect: "none" }}>Fútbol 11</text>
            </g>
            <rect x="349.5" y="16.5" width="224" height="335" rx={4} stroke="black" fill={getFacilityColor('Futbol 11')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="461.5" y="186" textAnchor="middle" fill={getTextColor('Futbol 11')} fontSize="22" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Futbol 11')}</text>
          </g>

          {/* Piscina */}
          <g onClick={() => handleClick('Piscina')} className="cursor-pointer group">
            <g filter="url(#filterpi)">
              <rect x="127" y="3" width="95" height="146" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-piscina" x="149.5" y="25" width="50" height="50" />
              <text x="174.5" y="100" textAnchor="middle" fill='#000' fontSize="10" fontWeight="bold" style={{ userSelect: "none" }}>Piscina</text>
              <text x="174.5" y="110" textAnchor="middle" fill='#000' fontSize="10" fontWeight="bold" style={{ userSelect: "none" }}>Semiolímpica</text>
            </g>
            <rect x="126.5" y="2.5" width="96" height="147" rx={4} stroke="black" fill={getFacilityColor('Piscina')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="174.5" y="76" textAnchor="middle" fill={getTextColor('Piscina')} fontSize="12" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Piscina')}</text>
          </g>

          {/* Voleyball N3 */}
          <g onClick={() => handleClick('Voleyball N3')} className="cursor-pointer group">
            <g filter="url(#filtervn3)">
              <rect x="75" y="323" width="28" height="57" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-voley" x="82" y="334" width="14" height="14" />
              <text x="89" y="359" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>Voley</text>
              <text x="89" y="369" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>N3</text>
            </g>
            <rect x="74.5" y="322.5" width="29" height="58" rx={4} stroke="black" fill={getFacilityColor('Voleyball N3')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="89" y="354" textAnchor="middle" fill={getTextColor('Voleyball N3')} fontSize="4.5" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Voleyball N3')}</text>
          </g>

          {/* Voleyball N2 */}
          <g onClick={() => handleClick('Voleyball N2')} className="cursor-pointer group">
            <g filter="url(#filtervn2)">
              <rect x="132" y="323" width="28" height="57" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-voley" x="139" y="334" width="14" height="14" />
              <text x="146" y="359" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>Voley</text>
              <text x="146" y="369" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>N2</text>
            </g>
            <rect x="131.5" y="322.5" width="29" height="58" rx={4} stroke="black" fill={getFacilityColor('Voleyball N2')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="146" y="354" textAnchor="middle" fill={getTextColor('Voleyball N2')} fontSize="4.5" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Voleyball N2')}</text>
          </g>

          {/* Voleyball N1 */}
          <g onClick={() => handleClick('Voleyball N1')} className="cursor-pointer group">
            <g filter="url(#filtervn1)">
              <rect x="189" y="323" width="28" height="57" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-voley" x="196" y="334" width="14" height="14" />
              <text x="203" y="359" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>Voley</text>
              <text x="203" y="369" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>N1</text>
            </g>
            <rect x="188.5" y="322.5" width="29" height="58" rx={4} stroke="black" fill={getFacilityColor('Voleyball N1')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="203" y="354" textAnchor="middle" fill={getTextColor('Voleyball N1')} fontSize="4.5" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Voleyball N1')}</text>
          </g>
          <rect x="434" y="413" width="57" height="9" fill="#DB7500"/>

          {/* Voleyplaya */}
          <g onClick={() => handleClick('Voleyplaya')} className="cursor-pointer group">
            <g filter="url(#filtervp)">
              <rect x="434" y="380" width="57" height="28" rx="4" fill="#7493E0" stroke="black" />
              <use href="#icon-voleyplaya" x="449.5" y="380" width="26" height="26" />
            </g>
            <text x="462.5" y="420" textAnchor="middle" fill='#553801' fontSize="6" fontWeight="bold" style={{ userSelect: "none" }}>Voley de Playa</text>
            <rect x="433.5" y="379.5" width="58" height="29" fill={getFacilityColor('Voleyplaya')} rx={4} stroke="black" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="462.5" y="397" textAnchor="middle" fill={getTextColor('Voleyplaya')} fontSize="9" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Voleyplaya')}</text>
          </g>

          {/* Futsal */}
          <g onClick={() => handleClick('Futsal')} className="cursor-pointer group">
            <g filter="url(#filterf1)">
              <rect x="75" y="196" width="44" height="81" fill="#7493E0" rx="4" stroke="black" /> 
              <use href="#icon-futbol" x="87" y="214" width="20" height="20" />
              <text x="97" y="250" textAnchor="middle" fill='black' fontSize="8" fontWeight="bold" style={{ userSelect: "none" }}>Futsal</text>
            </g>
            <rect x="74.5" y="195.5" width="45" height="82" rx="4" stroke="black" fill={getFacilityColor('Futsal')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <text x="97" y="240" textAnchor="middle" fill={getTextColor('Futsal')} fontSize="7" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Futsal')}</text>
          </g>


          {/* Basketball N2 */}
          <g onClick={() => handleClick('Basketball N2')} className="cursor-pointer group">
            <g filter="url(#filterb2)">
              <rect x="132.5" y="196" width="44" height="81" fill="#7493E0" rx="4" stroke="black" />
              <use href="#icon-basket" x="144.5" y="210" width="24" height="24" />
              <text x="154.4" y="245" textAnchor="middle" fill='black' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>Básquetbol</text>
              <text x="154.4" y="255" textAnchor="middle" fill='black' fontSize="8" fontWeight="bold" style={{ userSelect: "none" }}>N2</text>
            </g>
            <rect x="132" y="195.5" width="45" height="82" rx="4" stroke="black" fill={getFacilityColor('Basketball N2')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <text x="154.5" y="240" textAnchor="middle" fill={getTextColor('Basketball N2')} fontSize="7" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Basketball N2')}</text>
          </g>

          {/* Basketball N1 */}
          <g onClick={() => handleClick('Basketball N1')} className="cursor-pointer group">
            <g filter="url(#filterb1)">
              <rect x="189" y="196" width="44" height="81" fill="#7493E0" rx="4" stroke="black" />
              <use href="#icon-basket" x="201" y="210" width="24" height="24" />
              <text x="211" y="245" textAnchor="middle" fill='black' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>Básquetbol</text>
              <text x="211" y="255" textAnchor="middle" fill='black' fontSize="8" fontWeight="bold" style={{ userSelect: "none" }}>N1</text>
            </g>
            <rect x="188.5" y="195.5" width="45" height="82" rx="4" stroke="black" fill={getFacilityColor('Basketball N1')} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="211" y="240" textAnchor="middle" fill={getTextColor('Basketball N1')} fontSize="7" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>
              {getStatusText('Basketball N1')}
            </text>
          </g>

          {/* Bloque Q */}
          <g onClick={() => handleClick('Bloque Q')} className="cursor-pointer group">
            <g filter="url(#filterq)">
              <rect x="-4" y="259.5" width="69" height="64" fill="#7493E0" rx={4} stroke="black" />
              <use href="#icon-bloqueq" x="16" y="264" width="40" height="40" />
              <text x="32.5" y="307" textAnchor="middle" fill='#000' fontSize="7" fontWeight="bold" style={{ userSelect: "none" }}>BLOQUE Q</text>
            </g>
            <rect x="-3.5" y="259" width="70" height="65" fill={getFacilityColor('Bloque Q')} rx={4} stroke="black" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
            <text x="32.5" y="294" textAnchor="middle" fill={getTextColor('Bloque Q')} fontSize="7" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ userSelect: "none", pointerEvents: "none" }}>{getStatusText('Bloque Q')}</text>
          </g>

          <path d="M324 -32L307 -14.5L316 27.5L322 1.5L330 -17.5L338.5 -32H324Z" fill="#DB7500" />
          <path d="M604.27 -32L621 -11.4118L612.143 38L606.238 7.41177L598.365 -14.9412L590 -32H604.27Z" fill="#DB7500" />
        </g>

        <defs>
          <filter id="filterg" x="263.9" y="265.9" width="42.2" height="26.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filtere" x="263.9" y="98.9" width="56.2" height="166.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filterpa" x="311.9" y="357.9" width="34.2" height="81.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filterf11" x="345.9" y="14.9" width="231.2" height="342.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filterpi" x="122.9" y="0.9" width="103.2" height="154.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filtervn3" x="70.9" y="320.9" width="36.2" height="65.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filtervn2" x="127.9" y="320.9" width="36.2" height="65.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filtervn1" x="184.9" y="320.9" width="36.2" height="65.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filtervp" x="429.9" y="375.9" width="65.2" height="36.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filterq" x="-8.1" y="257.4" width="77.2" height="72.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filterf1" x="70.9" y="193.9" width="52.2" height="89.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filterb2" x="128.4" y="193.9" width="52.2" height="89.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <filter id="filterb1" x="184.9" y="193.9" width="52.2" height="89.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2.05"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.72 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
          </filter>
          <clipPath id="clip0_1_3">
            <rect width="637" height="437" fill="white" />
          </clipPath>
        </defs>
      </svg>
    )
}