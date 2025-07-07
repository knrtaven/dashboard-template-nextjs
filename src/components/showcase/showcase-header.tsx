'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDownIcon, PlusIcon } from '@/icons';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';
import Button from '@/components/ui/button/Button';
import { Share2 } from 'lucide-react';
import Checkbox from '@/components/form/input/Checkbox';

const Header = () => {
  const [isSitesDropdownOpen, setIsSitesDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedSites, setSelectedSites] = useState<{
    [key: string]: boolean;
  }>({});

  const sites = useMemo(
    () => [
      'Alexandra Gardens',
      'Bundaleer HC',
      'Bundaleer RAC',
      'Charingfield',
      'Corporate Services',
      'Groundwater Lodge',
      'Harden Grange',
      'Nanyima',
      'Tenterfield Care',
      'The Bays',
      'Vincent Court',
      'Yackandandah Health',
      'Yaralla Place',
    ],
    []
  );

  // Use useCallback for toggleSitesDropdown to prevent unnecessary re-renders
  const toggleSitesDropdown = useCallback(() => {
    setIsSitesDropdownOpen((prev) => !prev);
  }, []);

  const handleCheckboxChange = useCallback((site: string, checked: boolean) => {
    setSelectedSites((prev) => {
      const newState = { ...prev, [site]: checked };
      return newState;
    });
  }, []);

  // Prevent item click from bubbling to dropdown item
  const preventPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="z-[13] flex justify-center bg-white px-5">
      <div className="z-[12] flex h-[72px] w-full max-w-[1032px] items-center justify-between px-0">
        {/* Left Section - Navigation */}
        <div className="flex items-center gap-3">
          {/* Sites Dropdown */}
          <div className="relative">
            <Button
              ref={buttonRef}
              onClick={toggleSitesDropdown}
              variant="outline"
              size="sm"
              className="dropdown-toggle !h-10 !rounded-[54px]"
              endIcon={
                <ChevronDownIcon
                  className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                    isSitesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <span className="text-sm font-medium text-gray-700">Sites</span>
            </Button>

            <div ref={dropdownRef}>
              <Dropdown
                isOpen={isSitesDropdownOpen}
                onClose={() => setIsSitesDropdownOpen(false)}
                className="left-0 max-h-[400px] w-[240px] overflow-y-auto"
              >
                {sites.length > 0 ? (
                  sites.map((site, index) => (
                    <DropdownItem
                      key={index}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <div onClick={preventPropagation}>
                        <Checkbox
                          checked={!!selectedSites[site]}
                          onChange={(checked) => handleCheckboxChange(site, checked)}
                        />
                      </div>
                      <span>{site}</span>
                    </DropdownItem>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No sites available</div>
                )}
              </Dropdown>
            </div>
          </div>

          <Button variant="outline" size="sm" className="!h-10 !rounded-[54px]">
            My Showcases
          </Button>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="!hidden !ring-[#7f56d9] sm:!flex"
            endIcon={<Share2 width={20} height={20} className="text-gray-700" />}
          >
            Share QR code
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="!ring-[#7f56d9]"
            endIcon={<PlusIcon size={20} className="text-gray-700" />}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
