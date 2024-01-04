import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'student_certificate' })
export class StudentCertificate extends AbstractEntity {
  @ApiProperty()
  @Column({ name: 'id', default: () => 'gen_random_uuid()', primary: true })
  id: string;

  @ApiProperty()
  @Column({ name: 'certificate_id' })
  certificateId: string;

  @ApiProperty()
  @Column({ name: 'address', unique: true })
  address: string;

  @ApiProperty()
  @Column({ name: 'name', nullable: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'metadata', nullable: true })
  metadata: string;
}