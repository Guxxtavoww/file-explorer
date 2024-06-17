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
  const {
    currentVolumeMountPoint,
    setCurrentVolumeMountPoint,
    childPath,
    removeChildPath,
  } = useAppState();

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
          <BreadcrumbLink>
            <BreadcrumbLink>{currentVolumeMountPoint}</BreadcrumbLink>
          </BreadcrumbLink>
        ) : null}
        {childPath.length
          ? childPath.map((path, index) => (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  key={index}
                  onClick={() => removeChildPath(path)}
                >
                  <BreadcrumbLink>{path}</BreadcrumbLink>
                </BreadcrumbLink>
              </>
            ))
          : null}
        {/*
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
