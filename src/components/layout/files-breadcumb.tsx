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

function handleFileName(path: string) {
  const split = path.split('\\');

  return split[split.length - 1] as string;
}

export function FilesBreadcumb() {
  const {
    currentVolumeMountPoint,
    setCurrentVolumeMountPoint,
    childPath,
    removeChildPath,
    clearChildPath,
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
            <BreadcrumbLink onClick={clearChildPath}>
              {currentVolumeMountPoint}
            </BreadcrumbLink>
          </BreadcrumbLink>
        ) : null}
        {childPath.length
          ? childPath.map((path, index) => (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  key={index}
                  onClick={() => removeChildPath(index)}
                >
                  <BreadcrumbLink>
                    {index > 0
                      ? handleFileName(path)
                      : path.replace(currentVolumeMountPoint as string, '')}
                  </BreadcrumbLink>
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
