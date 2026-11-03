import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, RadialGradient, Rect, Stop, Text } from 'react-native-svg';

import type { Box, KioskKind, MachineFrame, ScreenButton, Target } from '@/scenario/types';
import { colors } from '@/theme';

const FONT = 'System';
const VIEW_W = 353;
const VIEW_H = 768;
/** Places the 353x412 machine drawing in the upper part of the camera view, clear of the sheet. */
const MACHINE_TRANSFORM = 'translate(49, 84) scale(0.72)';

type Layout = {
  screen: Box;
  screenTop: string;
  screenBottom: string;
  text: string;
  subText: string;
  centerX: number;
  lineY: number;
  buttonY: number;
  button: [string, string];
  muted: [string, string];
};

const LAYOUT: Record<KioskKind, Layout> = {
  atm: { screen: { x: 62, y: 56, w: 229, h: 190 }, screenTop: '#21405F', screenBottom: '#0E1D2D', text: '#F2F6FA', subText: '#AFC2D4', centerX: 176.5, lineY: 100, buttonY: 162, button: ['#3C86D6', '#2665AE'], muted: ['#7B8694', '#5D6876'] },
  clinic: { screen: { x: 92, y: 48, w: 169, h: 220 }, screenTop: '#FFFFFF', screenBottom: '#EAF0F5', text: '#15212C', subText: '#4A5866', centerX: 176.5, lineY: 96, buttonY: 196, button: ['#3C86D6', '#2665AE'], muted: ['#9AA5B1', '#7E8995'] },
  order: { screen: { x: 102, y: 30, w: 149, h: 270 }, screenTop: '#FFFDF8', screenBottom: '#F3EFE6', text: '#1A1A1A', subText: '#5D6066', centerX: 176.5, lineY: 62, buttonY: 150, button: ['#E9573A', '#C8402A'], muted: ['#A9AEB4', '#8D9298'] },
  checkout: { screen: { x: 34, y: 36, w: 170, h: 120 }, screenTop: '#21405F', screenBottom: '#0E1D2D', text: '#F2F6FA', subText: '#AFC2D4', centerX: 119, lineY: 72, buttonY: 116, button: ['#33A066', '#23804F'], muted: ['#7B8694', '#5D6876'] },
  airport: { screen: { x: 84, y: 62, w: 185, h: 190 }, screenTop: '#163A62', screenBottom: '#0A1F37', text: '#FFFFFF', subText: '#BFD0E3', centerX: 176.5, lineY: 104, buttonY: 190, button: ['#3C8FE6', '#2470C4'], muted: ['#62748A', '#4B5C70'] },
};

/** Shared gradients: wall, floor, metals, glass, shadows, lens vignette. */
function SceneDefs() {
  const vgrad = (id: string, stops: [number, string][]) => (
    <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      {stops.map(([o, c]) => <Stop key={o} offset={o} stopColor={c} />)}
    </LinearGradient>
  );
  const hgrad = (id: string, stops: [number, string][]) => (
    <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      {stops.map(([o, c]) => <Stop key={o} offset={o} stopColor={c} />)}
    </LinearGradient>
  );
  return (
    <Defs>
      {vgrad('wall', [[0, '#8C8F91'], [0.55, '#73777A'], [1, '#5F6366']])}
      {vgrad('floor', [[0, '#4C4F52'], [1, '#2B2D30']])}
      <RadialGradient id="spot" cx="0.5" cy="0.32" r="0.62">
        <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.22} />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
      </RadialGradient>
      <RadialGradient id="vignette" cx="0.5" cy="0.4" r="0.75">
        <Stop offset="0.55" stopColor="#000000" stopOpacity={0} />
        <Stop offset="1" stopColor="#000000" stopOpacity={0.55} />
      </RadialGradient>
      <RadialGradient id="contact" cx="0.5" cy="0.5" r="0.5">
        <Stop offset="0" stopColor="#000000" stopOpacity={0.55} />
        <Stop offset="1" stopColor="#000000" stopOpacity={0} />
      </RadialGradient>
      {hgrad('steel', [[0, '#8E949A'], [0.12, '#C7CCD1'], [0.5, '#AEB4BA'], [0.88, '#C3C8CD'], [1, '#868C92']])}
      {hgrad('graphite', [[0, '#1B1D20'], [0.15, '#3A3E43'], [0.5, '#2A2D31'], [0.85, '#383C41'], [1, '#18191C']])}
      {hgrad('white', [[0, '#C9CDD1'], [0.12, '#F4F5F6'], [0.5, '#E6E8EA'], [0.88, '#F1F2F3'], [1, '#C3C7CB']])}
      {hgrad('teal', [[0, '#1F4E45'], [0.14, '#3A7D70'], [0.5, '#2F6B5F'], [0.86, '#3A7A6D'], [1, '#1D4840']])}
      {vgrad('bezel', [[0, '#2B2F34'], [1, '#121417']])}
      {vgrad('slot', [[0, '#050607'], [1, '#2A2D31']])}
      {vgrad('key', [[0, '#E9ECEF'], [1, '#BFC4C9']])}
      {vgrad('glassScan', [[0, '#1B2026'], [1, '#07090B']])}
      <LinearGradient id="reflect" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.2} />
        <Stop offset="0.45" stopColor="#FFFFFF" stopOpacity={0.04} />
        <Stop offset="0.46" stopColor="#FFFFFF" stopOpacity={0} />
      </LinearGradient>
      <RadialGradient id="glare" cx="0.5" cy="0.5" r="0.5">
        <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.97} />
        <Stop offset="0.6" stopColor="#FFFFFF" stopOpacity={0.55} />
        <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
      </RadialGradient>
      {Object.entries(LAYOUT).map(([k, l]) => (
        <LinearGradient key={k} id={`scr-${k}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={l.screenTop} />
          <Stop offset="1" stopColor={l.screenBottom} />
        </LinearGradient>
      ))}
      {Object.entries(LAYOUT).flatMap(([k, l]) => [
        <LinearGradient key={`${k}b`} id={`btn-${k}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={l.button[0]} />
          <Stop offset="1" stopColor={l.button[1]} />
        </LinearGradient>,
        <LinearGradient key={`${k}m`} id={`mut-${k}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={l.muted[0]} />
          <Stop offset="1" stopColor={l.muted[1]} />
        </LinearGradient>,
      ])}
    </Defs>
  );
}

function Room() {
  return (
    <G>
      <Rect width={VIEW_W} height={VIEW_H} fill="url(#wall)" />
      {Array.from({ length: 9 }, (_, i) => (
        <Rect key={i} x={i * 44 - 10} y={0} width={1} height={470} fill="#000" opacity={0.06} />
      ))}
      <Rect y={470} width={VIEW_W} height={VIEW_H - 470} fill="url(#floor)" />
      <Rect y={468} width={VIEW_W} height={3} fill="#000" opacity={0.25} />
      <Rect width={VIEW_W} height={VIEW_H} fill="url(#spot)" />
    </G>
  );
}

/** Camera-style corner brackets around something the model detected. */
function Brackets({ x, y, w, h, color, len = 12, sw = 2, opacity = 0.9 }: Box & { color: string; len?: number; sw?: number; opacity?: number }) {
  const l = Math.min(len, w / 3, h / 3);
  const d = [
    `M${x} ${y + l}V${y}H${x + l}`,
    `M${x + w - l} ${y}H${x + w}V${y + l}`,
    `M${x + w} ${y + h - l}V${y + h}H${x + w - l}`,
    `M${x + l} ${y + h}H${x}V${y + h - l}`,
  ].join('');
  return <Path d={d} stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />;
}

function TargetBox({ target }: { target: Target }) {
  const labelW = target.label.length * 7.4 + 34;
  const { x, y, w, h } = target;
  return (
    <G>
      <Rect x={x} y={y} width={w} height={h} rx={6} fill={colors.signal} opacity={0.2} />
      <Rect x={x} y={y} width={w} height={h} rx={6} fill="none" stroke={colors.signal} strokeWidth={1} opacity={0.7} />
      <Brackets x={x - 4} y={y - 4} w={w + 8} h={h + 8} color={colors.signal} len={14} sw={4} opacity={1} />
      <G x={x + w / 2} y={y - 22}>
        <Rect x={-labelW / 2} y={-14} width={labelW} height={28} rx={14} fill={colors.ink} />
        <Circle cx={-labelW / 2 + 15} cy={0} r={4.5} fill={colors.signal} />
        <Text x={7} y={4.5} textAnchor="middle" fontSize={13} fontWeight="600" fill="#FFFFFF" fontFamily={FONT}>
          {target.label}
        </Text>
      </G>
    </G>
  );
}

function Glass({ x, y, w, h }: Box) {
  return <Rect x={x} y={y} width={w} height={h} rx={7} fill="url(#reflect)" />;
}

function ScreenContent({ kind, lines, buttons, danger }: { kind: KioskKind; lines: string[]; buttons: ScreenButton[]; danger?: Box }) {
  const l = LAYOUT[kind];
  const s = l.screen;
  return (
    <G>
      <Rect x={s.x} y={s.y} width={s.w} height={s.h} rx={7} fill={`url(#scr-${kind})`} />
      <Rect x={s.x} y={s.y} width={s.w} height={18} rx={7} fill="#000" opacity={kind === 'clinic' || kind === 'order' ? 0.04 : 0.18} />
      {lines.map((line, i) => (
        <Text key={line} x={l.centerX} y={l.lineY + i * 24} textAnchor="middle" fontSize={i === 0 ? 16 : 12.5} fontWeight={i === 0 ? '700' : '500'} fill={i === 0 ? l.text : l.subText} fontFamily={FONT}>
          {line}
        </Text>
      ))}
      {buttons.map((b) => {
        const y = b.y ?? l.buttonY;
        const h = b.h ?? 30;
        const cx = b.x + b.w / 2;
        return (
          <G key={b.text}>
            <Rect x={b.x} y={y + 1.5} width={b.w} height={h} rx={8} fill="#000" opacity={0.18} />
            <Rect x={b.x} y={y} width={b.w} height={h} rx={8} fill={b.muted ? `url(#mut-${kind})` : `url(#btn-${kind})`} />
            <Rect x={b.x + 1} y={y + 1} width={b.w - 2} height={h / 2} rx={7} fill="#FFF" opacity={0.1} />
            <Text x={cx} y={b.sub ? y + h / 2 - 2 : y + h / 2 + 4.5} textAnchor="middle" fontSize={b.sub ? 11 : 12.5} fontWeight="700" fill="#FFFFFF" fontFamily={FONT}>
              {b.text}
            </Text>
            {b.sub && (
              <Text x={cx} y={y + h / 2 + 13} textAnchor="middle" fontSize={10.5} fontWeight="500" fill="rgba(255,255,255,0.88)" fontFamily={FONT}>
                {b.sub}
              </Text>
            )}
          </G>
        );
      })}
      {danger && <Rect x={danger.x} y={danger.y} width={danger.w} height={danger.h} rx={8} fill="rgba(210,65,44,0.32)" stroke="#FF6A55" strokeWidth={2.5} />}
      <Glass {...s} />
    </G>
  );
}

function Slot({ x, y, w, h = 10, led }: { x: number; y: number; w: number; h?: number; led?: boolean }) {
  return (
    <G>
      <Rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={(h + 8) / 2} fill="#000" opacity={0.18} />
      <Rect x={x} y={y} width={w} height={h} rx={h / 2} fill="url(#slot)" />
      {led && <Circle cx={x + w + 10} cy={y + h / 2} r={2.6} fill="#5BE38F" />}
    </G>
  );
}

function ContactShadow({ cx, w, y = 452 }: { cx: number; w: number; y?: number }) {
  return <Ellipse cx={cx} cy={y} rx={w / 2} ry={16} fill="url(#contact)" />;
}

function Body({ kind }: { kind: KioskKind }) {
  const s = LAYOUT[kind].screen;
  const bezel = <Rect x={s.x - 6} y={s.y - 6} width={s.w + 12} height={s.h + 12} rx={11} fill="url(#bezel)" />;
  switch (kind) {
    case 'atm':
      return (
        <G>
          <ContactShadow cx={176.5} w={300} />
          <Rect x={48} y={40} width={257} height={412} rx={16} fill="url(#steel)" />
          <Rect x={48} y={40} width={257} height={6} rx={3} fill="#FFF" opacity={0.35} />
          {bezel}
          {[0, 1, 2, 3].map((i) => (
            <G key={i}>
              <Rect x={52} y={78 + i * 38} width={6} height={20} rx={2} fill="#6E747A" />
              <Rect x={295} y={78 + i * 38} width={6} height={20} rx={2} fill="#6E747A" />
            </G>
          ))}
          <Rect x={124} y={258} width={128} height={116} rx={10} fill="#2A2D31" opacity={0.9} />
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''].map((d, i) => {
            const kx = 132 + (i % 3) * 38;
            const ky = 268 + Math.floor(i / 3) * 26;
            return (
              <G key={i}>
                <Rect x={kx} y={ky} width={30} height={19} rx={4} fill="url(#key)" />
                {d !== '' && (
                  <Text x={kx + 15} y={ky + 13.5} textAnchor="middle" fontSize={10} fontWeight="700" fill="#2A2D31" fontFamily={FONT}>
                    {d}
                  </Text>
                )}
                {d === '5' && <Rect x={kx + 12} y={ky + 15.5} width={6} height={1.6} rx={0.8} fill="#2A2D31" />}
              </G>
            );
          })}
          <Slot x={96} y={384} w={80} led />
          <Rect x={190} y={378} width={78} height={22} rx={6} fill="#7D8389" />
          <Slot x={196} y={384} w={66} />
        </G>
      );
    case 'clinic':
      return (
        <G>
          <ContactShadow cx={176.5} w={170} />
          <Rect x={150} y={400} width={53} height={52} fill="url(#white)" />
          <Rect x={120} y={444} width={113} height={10} rx={5} fill="#B9BEC3" />
          <Rect x={76} y={30} width={201} height={380} rx={20} fill="url(#white)" />
          {bezel}
          <Slot x={126} y={292} w={100} h={12} led />
          <Slot x={136} y={340} w={80} h={9} />
          <Circle cx={176.5} cy={378} r={10} fill="#2665AE" />
          <Circle cx={176.5} cy={376} r={6} fill="#FFF" opacity={0.25} />
        </G>
      );
    case 'order':
      return (
        <G>
          <ContactShadow cx={176.5} w={200} />
          <Rect x={150} y={438} width={53} height={16} fill="#17191C" />
          <Rect x={92} y={18} width={169} height={426} rx={18} fill="url(#graphite)" />
          {bezel}
          <Rect x={136} y={308} width={80} height={74} rx={12} fill="#3A3E43" />
          <Rect x={146} y={318} width={60} height={32} rx={6} fill="#0C0D0F" />
          <Text x={176} y={338} textAnchor="middle" fontSize={8.5} fontWeight="600" fill="#5BE38F" fontFamily={FONT}>
            TAP CARD
          </Text>
          <Path d="M168 366 q8 -6 16 0 M164 372 q12 -9 24 0" stroke="#D5D9DD" strokeWidth={2} fill="none" strokeLinecap="round" />
          <Slot x={124} y={394} w={104} h={8} />
        </G>
      );
    case 'checkout':
      return (
        <G>
          <ContactShadow cx={178} w={330} y={350} />
          <Rect x={20} y={200} width={316} height={140} rx={12} fill="url(#steel)" />
          <Rect x={20} y={200} width={316} height={5} rx={2.5} fill="#FFF" opacity={0.35} />
          <Rect x={110} y={156} width={18} height={50} fill="#6B7076" />
          <Rect x={28} y={28} width={182} height={136} rx={12} fill="url(#bezel)" />
          <Rect x={40} y={226} width={156} height={66} rx={9} fill="url(#glassScan)" />
          <Rect x={52} y={257} width={132} height={4} rx={2} fill="#FF4D4D" opacity={0.25} />
          <Path d="M52 259 H184" stroke="#FF5A5A" strokeWidth={1.6} opacity={0.95} />
          <Rect x={214} y={214} width={108} height={104} rx={9} fill="#C9CDD1" />
          <Rect x={214} y={214} width={108} height={8} rx={4} fill="#FFF" opacity={0.4} />
          <Path d="M236 300 L242 236 H294 L300 300 Z" fill="#EDE5D2" stroke="#B9AF97" strokeWidth={1.5} />
          <Path d="M254 236 q14 -18 28 0" stroke="#B9AF97" strokeWidth={2} fill="none" />
          <Rect x={220} y={112} width={42} height={72} rx={9} fill="url(#graphite)" />
          <Rect x={226} y={120} width={30} height={22} rx={4} fill="#3E6A8F" />
          <Circle cx={241} cy={165} r={7} fill="#2A2D31" />
        </G>
      );
    case 'airport':
      return (
        <G>
          <ContactShadow cx={176.5} w={240} />
          <Rect x={66} y={24} width={221} height={430} rx={16} fill="url(#white)" />
          <Path d="M66 54V40a16 16 0 0 1 16-16h189a16 16 0 0 1 16 16v14Z" fill="#2B5E93" />
          <Text x={176.5} y={44} textAnchor="middle" fontSize={13} fontWeight="700" fill="#FFFFFF" fontFamily={FONT}>
            Self check-in
          </Text>
          {bezel}
          <Rect x={96} y={278} width={104} height={48} rx={7} fill="#17222D" />
          <Rect x={104} y={286} width={88} height={32} rx={4} fill="#244A66" />
          <Rect x={104} y={286} width={88} height={32} rx={4} fill="url(#reflect)" />
          <Slot x={212} y={296} w={58} h={8} led />
          <Slot x={212} y={340} w={58} h={8} />
        </G>
      );
  }
}

function Kiosk({ frame }: { frame: Extract<MachineFrame, { kind: KioskKind }> }) {
  const s = LAYOUT[frame.kind].screen;
  return (
    <G transform={MACHINE_TRANSFORM}>
      <Body kind={frame.kind} />
      <ScreenContent kind={frame.kind} lines={frame.lines} buttons={frame.buttons} danger={frame.danger} />
      <Brackets x={s.x - 10} y={s.y - 10} w={s.w + 20} h={s.h + 20} color="#FFFFFF" len={16} sw={2.2} opacity={0.85} />
      {frame.kind === 'atm' && <Brackets x={120} y={254} w={136} h={124} color="#FFFFFF" len={12} sw={2} opacity={0.7} />}
      {frame.target && <TargetBox target={frame.target} />}
      {frame.glare && <Ellipse cx={s.x + s.w * 0.6} cy={s.y + s.h * 0.45} rx={s.w * 0.75} ry={s.h * 0.66} fill="url(#glare)" />}
    </G>
  );
}

function TicketMachine({ frame }: { frame: Extract<MachineFrame, { kind: 'ticket' }> }) {
  const { hand, target } = frame;
  return (
    <G transform={MACHINE_TRANSFORM}>
      <ContactShadow cx={176.5} w={320} />
      <Rect x={36} y={34} width={281} height={420} rx={16} fill="url(#teal)" />
      <Rect x={36} y={34} width={281} height={6} rx={3} fill="#FFF" opacity={0.3} />
      <Rect x={52} y={52} width={249} height={162} rx={11} fill="url(#bezel)" />
      <Rect x={58} y={58} width={237} height={150} rx={8} fill="url(#scr-atm)" />
      {frame.lines.map((line, i) => (
        <Text key={line} x={176} y={98 + i * 24} textAnchor="middle" fontSize={i === 0 ? 16 : 12.5} fontWeight={i === 0 ? '700' : '500'} fill={i === 0 ? '#F2F6FA' : '#AFC2D4'} fontFamily={FONT}>
          {line}
        </Text>
      ))}
      <Glass x={58} y={58} w={237} h={150} />
      <Brackets x={48} y={48} w={257} h={170} color="#FFFFFF" len={16} sw={2.2} opacity={0.85} />
      <Slot x={96} y={262} w={96} h={14} led />
      <Rect x={228} y={246} width={54} height={54} rx={12} fill="url(#key)" />
      <Path d="M246 280 q9 -7 18 0 M242 287 q13 -10 26 0" stroke="#4A5058" strokeWidth={2} fill="none" strokeLinecap="round" />
      <Rect x={80} y={350} width={192} height={28} rx={9} fill="#1A3D36" />
      <Slot x={86} y={356} w={180} h={16} />
      {target && <TargetBox target={target} />}
      {hand && (
        <G>
          {target && (
            <Path
              d={`M${hand.x - 8} ${hand.y + 14} Q ${hand.x - 30} ${target.y + 4}, ${target.x + target.w / 2 + 30} ${target.y + target.h / 2}`}
              stroke={colors.signal}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeDasharray="2 7"
            />
          )}
          <Circle cx={hand.x} cy={hand.y} r={24} fill="#FFFFFF" opacity={0.12} />
          <Circle cx={hand.x} cy={hand.y} r={15} fill="rgba(255,255,255,0.22)" stroke="#FFFFFF" strokeWidth={2.5} />
          <G x={hand.x + 54} y={hand.y + 4}>
            <Rect x={-38} y={-14} width={76} height={28} rx={14} fill={colors.ink} />
            <Text x={0} y={4.5} textAnchor="middle" fontSize={12} fontWeight="600" fill="#FFFFFF" fontFamily={FONT}>
              Your hand
            </Text>
          </G>
        </G>
      )}
    </G>
  );
}

export function MachineView({ frame }: { frame?: MachineFrame }) {
  if (!frame || frame.kind === 'paused') {
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.paused }]} />;
  }
  // Decorative camera view: the step sheet speaks for it, so keep it out of the accessibility tree.
  return (
    <View style={StyleSheet.absoluteFill} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none">
      <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMin slice">
        <SceneDefs />
        <Room />
        {frame.kind === 'ticket' ? <TicketMachine frame={frame} /> : <Kiosk frame={frame} />}
        <Rect width={VIEW_W} height={VIEW_H} fill="url(#vignette)" />
      </Svg>
    </View>
  );
}
