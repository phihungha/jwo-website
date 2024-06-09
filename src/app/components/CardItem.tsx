import { Card, Image, Stack, Text, CardBody } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Product } from "../types/types";
import CurrencyFormat from "../utils/currency-formats";

interface CardProps {
  productId: number;
  quantity: number;
  product: Product;
  unitPrice: number;
  linePrice: number;
}

const CardItem = (props: CardProps) => {
  let price = CurrencyFormat.format(props.unitPrice);
  let totalPrice = CurrencyFormat.format(props.linePrice);
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Text fontWeight="bold" fontSize="xl">
            Cell Phone
          </Text>

          <Stack mt={3} spacing={3}>
            <Stack alignItems="center" direction="row" spacing={3}>
              <Text fontWeight="bold">Quantity:</Text>
              <Text>{props.quantity}</Text>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={3}>
              <Text fontWeight="bold">Price:</Text>
              <Text>{price}</Text>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={3}>
              <Text fontWeight="bold">Total price:</Text>
              <Text>{totalPrice}</Text>
            </Stack>
          </Stack>
        </CardBody>
      </Stack>
    </Card>
  );
};
export default CardItem;
