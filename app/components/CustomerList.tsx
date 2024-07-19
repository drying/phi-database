import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { supabase } from "../../lib/supabaseClient";

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

interface CustomerListProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  setCustomers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase.from("customers").select("*");
    if (error) {
      console.error("Error fetching customers:", error);
    } else {
      setCustomers((data as Customer[]) || []);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (paymentFilter === "all" || customer.payment_status === paymentFilter)
  );

  const wrapText = (text: string, lineLength: number) => {
    const regex = new RegExp(`.{1,${lineLength}}`, "g");
    return text.match(regex) || [];
  };

  return (
    <Box>
      <Box mb={4}>
        <Input
          placeholder="顧客名で検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={2}
        />
        <Select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="all">全ての支払い状況</option>
          <option value="未払い">未払い</option>
          <option value="一部支払い">一部支払い</option>
          <option value="完了">完了</option>
        </Select>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>名前</Th>
              <Th>プログラム</Th>
              <Th>支払い状況</Th>
              <Th>開始日</Th>
              <Th>終了日</Th>
              <Th>備考</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCustomers.map((customer) => (
              <Tr key={customer.id}>
                <Td>{customer.name}</Td>
                <Td>{customer.program_name}</Td>
                <Td>{customer.payment_status}</Td>
                <Td>{customer.program_start_date}</Td>
                <Td>{customer.program_end_date}</Td>
                <Td>
                  <Text whiteSpace="pre-wrap">
                    {wrapText(customer.notes, 20).join("\n")}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
