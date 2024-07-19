import React from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Customer {
  id: number;
  name: string;
  total_amount_received: number;
  agency_profit: number;
  assigned_to: string;
}

interface DashboardCardProps {
  label: string;
  value: string;
  helpText: string;
}

interface DashboardProps {
  customers: Customer[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  label,
  value,
  helpText,
}) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py={"5"}
    shadow={"xl"}
    border={"1px solid"}
    borderColor={"gray.800"}
    rounded={"lg"}
  >
    <StatLabel fontWeight={"medium"} isTruncated>
      {label}
    </StatLabel>
    <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
      {value}
    </StatNumber>
    <StatHelpText>{helpText}</StatHelpText>
  </Stat>
);

const Dashboard: React.FC<DashboardProps> = ({ customers }) => {
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.total_amount_received,
    0
  );
  const totalProfit = customers.reduce(
    (sum, customer) => sum + customer.agency_profit,
    0
  );

  // カウンセラーごとの利益を計算
  const counselorProfits = customers.reduce((acc, customer) => {
    if (!acc[customer.assigned_to]) {
      acc[customer.assigned_to] = 0;
    }
    acc[customer.assigned_to] += customer.agency_profit;
    return acc;
  }, {} as Record<string, number>);

  // カウンセラーごとの利益のチャートデータを作成
  const chartData = Object.entries(counselorProfits).map(([name, profit]) => ({
    name,
    profit,
  }));

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <DashboardCard
          label="総収入"
          value={`¥${totalRevenue.toLocaleString()}`}
          helpText="全顧客からの総収入"
        />
        <DashboardCard
          label="総利益"
          value={`¥${totalProfit.toLocaleString()}`}
          helpText="総利益"
        />
      </SimpleGrid>
      <Box mt={8} height="400px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#82ca9d" name="カウンセラー利益" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
