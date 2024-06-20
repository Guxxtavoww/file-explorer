import React from 'react';

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
    setSearchResults,
  } = useAppState();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              setCurrentVolumeMountPoint(undefined);
              setSearchResults(undefined);
              clearChildPath();
            }}
          >
            Seu computador
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {currentVolumeMountPoint ? (
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                clearChildPath();
                setSearchResults(undefined);
              }}
            >
              {currentVolumeMountPoint}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : null}
        {childPath.length
          ? childPath.map((path, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  key={index}
                  onClick={() => {
                    removeChildPath(index);
                    setSearchResults(undefined);
                  }}
                >
                  <BreadcrumbItem>
                    {index > 0
                      ? handleFileName(path)
                      : path.replace(currentVolumeMountPoint as string, '')}
                  </BreadcrumbItem>
                </BreadcrumbLink>
              </React.Fragment>
            ))
          : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
