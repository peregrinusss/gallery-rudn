"use client";
import { useQueryState } from "next-usequerystate";
import React from "react";
import { ReactNode } from "react";
import { FC } from "react";
import { useEffect } from "react";
import {
  ReactTabsFunctionComponent,
  Tab,
  TabList,
  TabPanel,
  TabProps,
  Tabs,
} from "react-tabs";

const CustomTab: ReactTabsFunctionComponent<TabProps> = ({
  children,
  ...otherProps
}) => (
  <Tab
    {...otherProps}
    className="px-4 py-2 rounded-[20px] cursor-pointer active:opacity-70 transition-all focus:outline-none"
  >
    <span className="text-md text-[#00000080] font-medium whitespace-nowrap">
      {children}
    </span>
  </Tab>
);

CustomTab.tabsRole = "Tab";

type Props = {
  createPage: ReactNode;
  updatePage: ReactNode;
};

const Layout: FC<Props> = ({ createPage, updatePage }) => {
  const [tabIndex, setTabIndex] = useQueryState("tab");
  const handleSelect = (index: number) => {
    setTabIndex(index.toString());
  };

  useEffect(() => {
    setTabIndex(tabIndex);
  }, [tabIndex, setTabIndex]);

  return (
    <Tabs
      focusTabOnClick={false}
      selectedIndex={+tabIndex!}
      onSelect={handleSelect}
    >
      <TabList className="flex items-center gap-2">
        <CustomTab>Добавление</CustomTab>
        <CustomTab>Обновление</CustomTab>
      </TabList>
      <div className="mt-10">
        <TabPanel>{createPage}</TabPanel>
        <TabPanel>{updatePage}</TabPanel>
      </div>
    </Tabs>
  );
};

export default Layout;
