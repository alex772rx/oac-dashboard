import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Field,
  Flex,
  Input,
  Portal,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { OACSales } from "../../interfaces";
import { assigned, implantsTypeCollection } from "../../utils/data";
import { toaster } from "../ui/toaster";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddNewSaleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OACSales>({
    defaultValues: {
      date: "",
      bill_no: "",
      implants_name: "",
      implants_type: "SS",
      size: 0,
      quantity: 0,
      rate: "",
      assigned: "Santosh",
      institute: "",
      surgeon: "",
      remarks: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: OACSales) => {
    try {
      setLoading(true);
      const response = await fetch(`https://oac-api.onrender.com/api/sales/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toaster.create({
        description: "Added new Sale successfully!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error: any) {
      console.error("Error:", error.message);

      toaster.create({
        description: "Error creating new Sale! Try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex justify="flex-start" p={4}>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </Flex>

      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box
          w="full"
          maxW="lg"
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="md"
        >
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            gap={4}
            align="stretch"
          >
            <Field.Root invalid={!!errors.date}>
              <Field.Label>Date</Field.Label>
              <Input
                type="date"
                {...register("date", { required: "Date is required" })}
              />

              <Field.ErrorText>{errors.date?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.bill_no}>
              <Field.Label>Bill Number</Field.Label>
              <Input
                type="text"
                {...register("bill_no", {
                  required: "Bill number is required",
                })}
              />
              <Field.ErrorText>{errors.bill_no?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.implants_name}>
              <Field.Label>Implant Name</Field.Label>
              <Input
                type="text"
                {...register("implants_name", {
                  required: "Implant name is required",
                })}
              />
              <Field.ErrorText>{errors.implants_name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.implants_type}>
              <Field.Label>Implant Type</Field.Label>

              <Select.Root
                {...register("implants_type")}
                collection={implantsTypeCollection}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select Implant Type" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {implantsTypeCollection.items.map((type) => (
                        <Select.Item item={type} key={type.value}>
                          {type.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Field.ErrorText>{errors.implants_type?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.size}>
              <Field.Label>Size</Field.Label>
              <Input
                type="number"
                {...register("size", {
                  required: "Size is required",
                  valueAsNumber: true,
                })}
              />
              <Field.ErrorText>{errors.size?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.quantity}>
              <Field.Label>Quantity</Field.Label>
              <Input
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                })}
              />
              <Field.ErrorText>{errors.quantity?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.rate}>
              <Field.Label>Rate</Field.Label>
              <Input
                type="text"
                {...register("rate", { required: "Rate is required" })}
              />
              <Field.ErrorText>{errors.rate?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.assigned}>
              <Field.Label>Assignee</Field.Label>

              <Select.Root {...register("assigned")} collection={assigned}>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select Assignee" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {assigned.items.slice(1).map((assignee) => (
                        <Select.Item item={assignee} key={assignee.value}>
                          {assignee.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Field.ErrorText>{errors.assigned?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.institute}>
              <Field.Label>Institute</Field.Label>
              <Input
                type="text"
                {...register("institute", {
                  required: "Institute is required",
                })}
              />
              <Field.ErrorText>{errors.institute?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.surgeon}>
              <Field.Label>Surgeon</Field.Label>
              <Input
                type="text"
                {...register("surgeon", { required: "Surgeon is required" })}
              />
              <Field.ErrorText>{errors.surgeon?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.remarks}>
              <Field.Label>Remarks</Field.Label>
              <Textarea
                {...register("remarks")}
                placeholder="Enter any remarks"
              />
              <Field.ErrorText>{errors.remarks?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit" mt={4} loading={loading}>
              Submit
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default AddNewSaleForm;
