import {Field, Float, Int, ObjectType} from 'type-graphql';
import {StockItemModel} from '../models';

@ObjectType()
export class StockItem implements StockItemModel {
  @Field()
  id: string;
  @Field()
  description: string;
  @Field()
  manufacturer: string;
  @Field()
  name: string;
  @Field({nullable: true})
  picture: string;
  @Field(type => Int)
  stock: number;
  @Field(type => Float)
  unitPrice: number;
}
