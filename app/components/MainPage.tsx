import React, { useState, useEffect } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";
import { supabase } from "../../lib/supabaseClient";

// Customer インターフェースを定義
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  program_name: string;
  school_name: string;
  total_amount_received: number;
  amount_paid_to_school: number;
  agency_profit: number;
  payment_status: string;
  program_start_date: string;
  program_end_date: string;
  assigned_to: string;
  notes: string;
}

const MainPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  // customers の型を Customer[] として明示的に定義
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase.from("customers").select("*");
    if (error) {
      console.error("Error fetching customers:", error);
    } else {
      // データが null の場合は空配列を設定
      setCustomers((data as Customer[]) || []);
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
