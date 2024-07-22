import { Card, Image, Stack, Text, CardBody } from "@chakra-ui/react";
import { Product } from "../types/types";
import CurrencyFormat from "../utils/currency-formats";

interface CardProps {
  productId: number;
  quantity: number;
  product: Product;
  unitPrice: string;
  linePrice: string;
}

const CardItem = (props: CardProps) => {
  let price = CurrencyFormat.format(parseFloat(props.unitPrice));
  let totalPrice = CurrencyFormat.format(parseFloat(props.linePrice));
  return (
    <Stack paddingTop={10}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={props.product.imageUrl}
          alt={props.product.name}
        />

        <Stack>
          <CardBody>
            <Text fontWeight="bold" fontSize="xl">
              {props.product.name}
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
    </Stack>
  );
};
export default CardItem;
