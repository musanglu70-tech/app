// @license SPDX-License-Identifier: Apache-2.0
import React, { CSSProperties } from 'react';
interface WooriLogoProps { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom'; customStyle?: CSSProperties; allowEdit?: boolean; }
const SIZE_PX: Record<string, number> = { sm: 32, md: 48, lg: 64, xl: 96, custom: 48 };
const LOGO_URL = 'https://wooree.vercel.app/wr-logo.png';
export default function WooriLogo(props: WooriLogoProps) {
const className = props.className ?? '';
const size = props.size ?? 'md';
const px = SIZE_PX[size] ?? 48;
return (
<div className={'woori-logo relative select-none ' + className} style={props.customStyle}>
<img src={LOGO_URL} alt="CSO (주)우리메디텍 로고" width={px} height={px} style={{ width: px, height: px, aspectRatio: '1 / 1', objectFit: 'contain', display: 'block' }} draggable={false} />
</div>
);
}