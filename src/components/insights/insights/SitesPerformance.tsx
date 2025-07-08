'use client';


import { ArrowDown, ArrowUp } from 'lucide-react';
import Button from '../../ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../ui/table';

interface Order {
  id: number;
  name: string;
  leadRite: {
    percentage: number;
    percentageChange: number;
  },
  workRite: {
    percentage: number;
    percentageChange: number;
  },
  careRite: {
    percentage: number;
    percentageChange: number;
  },
  comments: number;
  showcases: number;
}

const PercentageChange = ({ value }: { value: number }) => (
  <span className={`inline-flex items-center ml-2 ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
    {value >= 0 ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    )}
    <span className="ml-1 text-xs">{Math.abs(value)}%</span>
  </span>
);

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    name: "Lindsey Curtis",
    leadRite: { percentage: 75, percentageChange: 5 },
    workRite: { percentage: 60, percentageChange: -2 },
    careRite: { percentage: 85, percentageChange: 3 },
    comments: 12,
    showcases: 3
  },
  {
    id: 2,
    name: "Kaiya George",
    leadRite: { percentage: 80, percentageChange: 3 },
    workRite: { percentage: 70, percentageChange: -1 },
    careRite: { percentage: 90, percentageChange: 2 },
    comments: 8,
    showcases: 2
  },
  {
    id: 3,
    name: "Zain Geidt",
    leadRite: { percentage: 65, percentageChange: -3 },
    workRite: { percentage: 75, percentageChange: 4 },
    careRite: { percentage: 80, percentageChange: 1 },
    comments: 15,
    showcases: 5
  },
  {
    id: 4,
    name: "Abram Schleifer",
    leadRite: { percentage: 70, percentageChange: 2 },
    workRite: { percentage: 65, percentageChange: -4 },
    careRite: { percentage: 75, percentageChange: 0 },
    comments: 6,
    showcases: 1
  },
  {
    id: 5,
    name: "Carla George",
    leadRite: { percentage: 85, percentageChange: 4 },
    workRite: { percentage: 80, percentageChange: 3 },
    careRite: { percentage: 95, percentageChange: 2 },
    comments: 20,
    showcases: 4
  },
  {
    id: 6,
    name: "Emily Johnson",
    leadRite: { percentage: 78, percentageChange: 2 },
    workRite: { percentage: 82, percentageChange: 1 },
    careRite: { percentage: 88, percentageChange: 4 },
    comments: 45,
    showcases: 7
  },
  {
    id: 7,
    name: "Michael Chen",
    leadRite: { percentage: 65, percentageChange: -1 },
    workRite: { percentage: 73, percentageChange: 3 },
    careRite: { percentage: 79, percentageChange: 0 },
    comments: 28,
    showcases: 4
  },
  {
    id: 8,
    name: "Sarah Thompson",
    leadRite: { percentage: 72, percentageChange: 3 },
    workRite: { percentage: 68, percentageChange: -2 },
    careRite: { percentage: 81, percentageChange: 1 },
    comments: 17,
    showcases: 3
  },
  {
    id: 9,
    name: "David Martinez",
    leadRite: { percentage: 80, percentageChange: 4 },
    workRite: { percentage: 75, percentageChange: 2 },
    careRite: { percentage: 90, percentageChange: 3 },
    comments: 32,
    showcases: 6
  },
  {
    id: 10,
    name: "Olivia Wilson",
    leadRite: { percentage: 68, percentageChange: -2 },
    workRite: { percentage: 70, percentageChange: 1 },
    careRite: { percentage: 78, percentageChange: 0 },
    comments: 14,
    showcases: 2
  },
  {
    id: 11,
    name: "James Anderson",
    leadRite: { percentage: 75, percentageChange: 3 },
    workRite: { percentage: 80, percentageChange: 4 },
    careRite: { percentage: 85, percentageChange: 2 },
    comments: 25,
    showcases: 5
  },
  {
    id: 12,
    name: "Sophia Brown",
    leadRite: { percentage: 70, percentageChange: 1 },
    workRite: { percentage: 65, percentageChange: -3 },
    careRite: { percentage: 75, percentageChange: 0 },
    comments: 10,
    showcases: 1
  },
  {
    id: 13,
    name: "William Taylor",
    leadRite: { percentage: 82, percentageChange: 4 },
    workRite: { percentage: 78, percentageChange: 2 },
    careRite: { percentage: 88, percentageChange: 3 },
    comments: 38,
    showcases: 6
  },
  {
    id: 14,
    name: "Emma Garcia",
    leadRite: { percentage: 69, percentageChange: -1 },
    workRite: { percentage: 72, percentageChange: 2 },
    careRite: { percentage: 80, percentageChange: 1 },
    comments: 22,
    showcases: 3
  },
  {
    id: 15,
    name: "Daniel Rodriguez",
    leadRite: { percentage: 77, percentageChange: 3 },
    workRite: { percentage: 74, percentageChange: 1 },
    careRite: { percentage: 83, percentageChange: 2 },
    comments: 30,
    showcases: 4
  }
];

const SitesPerformance = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg text-gray-500 font-medium'>
        Sites performance
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden lg:table-cell px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Lead Rite
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden lg:table-cell px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Work Rite
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden lg:table-cell px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Care Rite
                  </TableCell>
                    <TableCell
                    isHeader
                    className="hidden 2xl:table-cell px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Comments
                  </TableCell>
                  <TableCell
                    isHeader
                    className="hidden 2xl:table-cell px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Showcases
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.name}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.leadRite.percentage}%
                      <PercentageChange value={order.leadRite.percentageChange} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.workRite.percentage}%
                      <PercentageChange value={order.workRite.percentageChange} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.careRite.percentage}%
                      <PercentageChange value={order.careRite.percentageChange} />
                    </TableCell>
                    <TableCell className="hidden 2xl:table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.comments}
                    </TableCell>
                    <TableCell className="hidden 2xl:table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.showcases}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center flex items-center justify-center">
                      <Button className="hover:bg-gray-50 rounded-lg">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitesPerformance;
