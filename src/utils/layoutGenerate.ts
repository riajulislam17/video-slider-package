export function getResponsiveGridCols(layout: Layout): string {
  const colClasses = [
    // for small device
    layout.mobile.column === 1 && "grid-cols-1",
    layout.mobile.column === 2 && "grid-cols-2",
    layout.mobile.column === 3 && "grid-cols-3",
    layout.mobile.column === 4 && "grid-cols-4",
    layout.mobile.column === 5 && "grid-cols-5",
    layout.mobile.column === 6 && "grid-cols-6",
    layout.mobile.column === 7 && "grid-cols-7",
    layout.mobile.column === 8 && "grid-cols-8",
    layout.mobile.column === 9 && "grid-cols-9",
    layout.mobile.column === 10 && "grid-cols-10",
    layout.mobile.column === 11 && "grid-cols-11",
    layout.mobile.column === 12 && "grid-cols-12",

    // for medium device
    layout.tablet.column === 1 && "md:grid-cols-1",
    layout.tablet.column === 2 && "md:grid-cols-2",
    layout.tablet.column === 3 && "md:grid-cols-3",
    layout.tablet.column === 4 && "md:grid-cols-4",
    layout.tablet.column === 5 && "md:grid-cols-5",
    layout.tablet.column === 6 && "md:grid-cols-6",
    layout.tablet.column === 7 && "md:grid-cols-7",
    layout.tablet.column === 8 && "md:grid-cols-8",
    layout.tablet.column === 9 && "md:grid-cols-9",
    layout.tablet.column === 10 && "md:grid-cols-10",
    layout.tablet.column === 11 && "md:grid-cols-11",
    layout.tablet.column === 12 && "md:grid-cols-12",

    // for large device
    layout.desktop.column === 1 && "lg:grid-cols-1",
    layout.desktop.column === 2 && "lg:grid-cols-2",
    layout.desktop.column === 3 && "lg:grid-cols-3",
    layout.desktop.column === 4 && "lg:grid-cols-4",
    layout.desktop.column === 5 && "lg:grid-cols-5",
    layout.desktop.column === 6 && "lg:grid-cols-6",
    layout.desktop.column === 7 && "lg:grid-cols-7",
    layout.desktop.column === 8 && "lg:grid-cols-8",
    layout.desktop.column === 9 && "lg:grid-cols-9",
    layout.desktop.column === 10 && "lg:grid-cols-10",
    layout.desktop.column === 11 && "lg:grid-cols-11",
    layout.desktop.column === 12 && "lg:grid-cols-12",
  ];

  return colClasses.filter(Boolean).join(" ");
}
