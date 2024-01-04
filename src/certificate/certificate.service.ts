import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { OrganizationMember } from 'src/organization/entities/organization-member.entity';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(CertificateTemplate)
    private readonly certificateTemplateRepository: Repository<CertificateTemplate>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
  ) {}

  async init() {
    const certificateTemplate = [
      {
        name: 'Certificate Template 1',

        background: 'https://i.imgur.com/rJrxCWK.png',
        height: 2000,
        width: 1414,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '80px Arial',
            x: 680,
            y: 700,
          },
          {
            name: 'date',
            display: 'Date:',
            font: '30px Arial',
            x: 400,
            y: 1080,
          },
          {
            name: 'signature',
            display: 'Signature:',
            font: '30px Arial',
            x: 1400,
            y: 1080,
          },
        ],
        demo: {
          name: '[Full Name Here]',
          date: '[01/01/2024]',
          signature: '[Signature Here]',
        },
      },
    ];

    const userInfo = await this.userInfoRepository.findOne({
      where: {
        walletAddress: 'HcUY736DPeVuFSj85nufCDXCY8sLfk517DsF6GSH1yvA',
      },
    });
    const organizationMember = await this.organizationMemberRepository.find({
      where: {
        userId: userInfo.id,
      },
    });
    certificateTemplate.map(async (item) => {
      const template = new CertificateTemplate();
      template.name = item.name;
      template.organizationId = organizationMember[0].organizationId;
      template.public = true;
      template.background = item.background;
      template.height = item.height;
      template.width = item.width;
      template.atributtes = item.atributtes;
      template.demo = item.demo;
      await this.certificateTemplateRepository.save(template);
    });
  }

  async getTemplate(request) {
    const { user } = request;
    const listCertificate = await this.certificateTemplateRepository.find({
      where: [
        {
          organizationId: user.organizationId,
        },
        {
          public: true,
        },
      ],
    });
    return listCertificate;
  }
}