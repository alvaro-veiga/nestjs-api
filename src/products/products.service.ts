import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsSlugAlreadyExistsError } from './errors';

@Injectable()
export class ProductsService {

  constructor (private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.findFirst({
      where: {
        slug: createProductDto.slug,
      }
    })

    if(product) {
      throw new ProductsSlugAlreadyExistsError(createProductDto.slug);
    }

    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id,
      }
    })
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update ({
      where: {
        id
      },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prismaService.product.delete({
      where: {
        id,
      }
    })
  }
}
