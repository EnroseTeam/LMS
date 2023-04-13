import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import amazon from '@/assets/amazon-4.svg';
import amd from '@/assets/amd-logo-1-2.svg';
import cisco from '@/assets/cisco-2-1-2.svg';
import dropcam from '@/assets/dropcam.svg';
import logitech from '@/assets/logitech-2-1-3-1.svg';
import spotify from '@/assets/Spotify-2-2.svg';

const PartnerSection: FC = () => (
  <div className="container pt-11 pb-[130px]">
    <p className="text-md-regular mb-[52.5px] text-center text-head">Trusted by the world’s best</p>
    <div className="flex items-center gap-[150px] justify-between">
      <Link href="/">
        <Image src={amazon} alt="" />
      </Link>
      <Link href="/">
        <Image src={amd} alt="" />
      </Link>
      <Link href="/">
        <Image src={cisco} alt="" />
      </Link>
      <Link href="/">
        <Image src={dropcam} alt="" />
      </Link>
      <Link href="/">
        <Image src={logitech} alt="" />
      </Link>
      <Link href="/">
        <Image src={spotify} alt="" />
      </Link>
    </div>
  </div>
);

export default PartnerSection;
