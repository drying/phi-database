import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { supabase } from "../../lib/supabaseClient";

interface CustomerFormProps {
  onCustomerAdded: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  program_name: string;
  school_name: string;
  total_amount_received: string;
  amount_paid_to_school: string;
  agency_profit: string;
  payment_status: string;
  program_start_date: string;
  program_end_date: string;
  assigned_to: string;
  notes: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onCustomerAdded }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    program_name: "",
    school_name: "",
    total_amount_received: "",
    amount_paid_to_school: "",
    agency_profit: "",
    payment_status: "",
    program_start_date: "",
    program_end_date: "",
    assigned_to: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("customers").insert([
      {
        ...formData,
        total_amount_received: parseInt(formData.total_amount_received),
        amount_paid_to_school: parseInt(formData.amount_paid_to_school),
        agency_profit: parseInt(formData.agency_profit),
      },
    ]);

    if (error) {
      console.error("Error inserting customer:", error);
    } else {
      console.log("Customer added successfully:", data);
      // フォームをリセット
      setFormData({
        name: "",
        email: "",
        phone: "",
        program_name: "",
        school_name: "",
        total_amount_received: "",
        amount_paid_to_school: "",
        agency_profit: "",
        payment_status: "",
        program_start_date: "",
        program_end_date: "",
        assigned_to: "",
        notes: "",
      });
      // 親コンポーネントに通知
      onCustomerAdded();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>名前</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>電話番号</FormLabel>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>プログラム名</FormLabel>
          <Input
            name="program_name"
            value={formData.program_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>学校名</FormLabel>
          <Input
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>受取総額 (円)</FormLabel>
          <Input
            name="total_amount_received"
            type="number"
            value={formData.total_amount_received}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>学校支払額 (円)</FormLabel>
          <Input
            name="amount_paid_to_school"
            type="number"
            value={formData.amount_paid_to_school}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>エージェンシー利益 (円)</FormLabel>
          <Input
            name="agency_profit"
            type="number"
            value={formData.agency_profit}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>支払い状況</FormLabel>
          <Select
            name="payment_status"
            value={formData.payment_status}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            <option value="未払い">未払い</option>
            <option value="一部支払い">一部支払い</option>
            <option value="完了">完了</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>プログラム開始日</FormLabel>
          <Input
            name="program_start_date"
            type="date"
            value={formData.program_start_date}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>プログラム終了日</FormLabel>
          <Input
            name="program_end_date"
            type="date"
            value={formData.program_end_date}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>担当者</FormLabel>
          <Input
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>備考</FormLabel>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          顧客を追加
        </Button>
      </VStack>
    </Box>
  );
};

export default CustomerForm;
