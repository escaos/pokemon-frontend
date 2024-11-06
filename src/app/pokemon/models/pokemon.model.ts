import { BaseModel } from '../../shared/models/base.model';

export interface Pokemon extends BaseModel {
  name: string;
  imageUrl: string;
}
