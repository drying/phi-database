import React, { useState, useEffect } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";
import { supabase } from "../../lib/supabaseClient";

const MainPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase.from("customers").select("*");
    if (error) {
      console.error("Error fetching customers:", error);
    } else {
      setCustomers(data || []);
    }
  };

  return (
    <Box>
      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>ダッシュボード</Tab>
          <Tab>顧客リスト</Tab>
          <Tab>新規顧客登録</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Dashboard customers={customers} />
          </TabPanel>
          <TabPanel>
            <CustomerList customers={customers} setCustomers={setCustomers} />
          </TabPanel>
          <TabPanel>
            <CustomerForm onCustomerAdded={fetchCustomers} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MainPage;
