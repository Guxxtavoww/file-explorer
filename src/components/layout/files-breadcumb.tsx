'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcumb';
import { useAppState } from '@/shared/state/app.state';

export function FilesBreadcumb() {
  const { currentVolumeMountPoint, setCurrentVolumeMountPoint } = useAppState();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => setCurrentVolumeMountPoint(undefined)}>
            Seu computador
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {currentVolumeMountPoint ? (
          <BreadcrumbItem>
            <BreadcrumbLink>{currentVolumeMountPoint}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : null}
        {/*
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
