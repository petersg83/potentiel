import React, { FC } from 'react';
import { Link, FileDownloadIcon } from '../atoms';

type DownloadLinkProps = {
  className?: string;
  fileUrl: string;
};

export const DownloadLink: FC<DownloadLinkProps> = ({ children, className, fileUrl }) => (
  <Link className={className} href={fileUrl} download>
    <FileDownloadIcon className="text-lg mr-1 -mb-1 shrink-0" aria-hidden />
    {children}
  </Link>
);
