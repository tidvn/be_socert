import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateTemplate } from './entities/certificate-template.entity';
import { UserInfo } from 'src/user/entities/user_info.entity';
import { OrganizationMember } from 'src/organization/entities/organization-member.entity';
import { UserState } from 'src/user/entities/user_state.entity';
import { isNil } from 'lodash';
import { CreateCertificateCollectionDTO } from './dto/createCertificateCollection';
import { Certificate } from './entities/certificate.entity';
import { CertificateMember } from './entities/certificate-member.entity';
import { SITE_URL } from 'src/app.environment';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    @InjectRepository(CertificateTemplate)
    private readonly certificateTemplateRepository: Repository<CertificateTemplate>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
    @InjectRepository(OrganizationMember)
    private readonly organizationMemberRepository: Repository<OrganizationMember>,
    @InjectRepository(CertificateMember)
    private readonly certificateMemberRepository: Repository<CertificateMember>,
  ) { }

  async init() {
    const certificateTemplate = [
      {
        name: 'certificate of participation in the event',
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
      {
        name: 'certificate of participation in the workshop',
        background: 'https://i.imgur.com/XmorjTQ.png',
        height: 2000,
        width: 1414,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '80px Arial',
            x: 680,
            y: 680,
          },
          {
            name: 'workshop_coach',
            display: '[workshop_coach]',
            font: '30px Arial',
            x: 530,
            y: 1170,
          },
          {
            name: 'head_of_event',
            display: '[head_of_event]',
            font: '30px Arial',
            x: 1200,
            y: 1170,
          },
        ],
        demo: {
          name: '[Full Name Here]',
          workshop_coach: '[workshop_coach]',
          head_of_event: '[head_of_event]',
        },
      },
      {
        name: 'certificate of completion of the course',
        background: 'https://i.imgur.com/TVrqssc.png',
        height: 2000,
        width: 1414,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '80px Arial',
            x: 680,
            y: 680,
          },
        ],
        demo: {
          name: '[Full Name Here]',
        },
      },
      {
        name: 'certificate of any reward',
        background: 'https://i.imgur.com/0vQfvFE.png',
        height: 1414,
        width: 2000,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '100px Arial',
            x: 300,
            y: 950,
          },
        ],
        demo: {
          name: '[Full Name Here]',
        },
      },
      {
        name: 'certificate of any reward',
        background: 'https://i.imgur.com/Ygk1ywt.png',
        height: 1414,
        width: 2000,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '100px Arial',
            x: 300,
            y: 1100,
          },
        ],
        demo: {
          name: '[Full Name Here]',
        },
      },
      {
        name: 'certificate of company membership',
        background: 'https://i.imgur.com/TeUtlJt.png',
        height: 1414,
        width: 2000,
        atributtes: [
          {
            name: 'name',
            display: 'Name:',
            font: '100px Arial',
            x: 300,
            y: 1050,
          },
          {
            name: 'date',
            display: 'date:',
            font: '40px Arial',
            x: 230,
            y: 1580,
          },
        ],
        demo: {
          name: '[Full Name Here]',
          date: '[01/01/2024]',
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
  async init2() {
    const templateData = {
      name: 'certificate of socert course',
      background: 'https://i.imgur.com/Xe0zOFr.png',
      height: 1792,
      width: 1296,
      fillStyle: "white",
      atributtes: [
        {
          name: 'name',
          display: 'Name:',
          font: '50px Arial',
          x: 900,
          y: 750,
        },
        {
          name: 'month',
          display: 'month:',
          font: '40px Arial',
          x: 390,
          y: 1070,
        },

        {
          name: 'year',
          display: 'year:',
          font: '40px Arial',
          x: 490,
          y: 1070,
        },
        {
          name: 'rank',
          display: 'rank:',
          font: '40px Arial',
          x: 910,
          y: 870,
        },
        {
          name: 'course',
          display: 'course:',
          font: '40px Arial',
          x: 1080,
          y: 815,
        },
      ],

      demo: {
        name: '[Full_Name]',
        month: '[Month]',
        year: '[Year]',
        rank: "[Rank]",
        course: "[Course]"
      },
    };


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
    const template = new CertificateTemplate();
    template.name = templateData.name;
    template.organizationId = organizationMember[0].organizationId;
    template.public = true;
    template.fillStyle = templateData.fillStyle;
    template.background = templateData.background;
    template.height = templateData.height;
    template.width = templateData.width;
    template.atributtes = templateData.atributtes;
    template.demo = templateData.demo;
    await this.certificateTemplateRepository.save(template);

  }

  async createOrganizationCertificate(
    request,
    createCertificateCollection: CreateCertificateCollectionDTO,
  ) {
    const { user } = request;
    const organizationMember = await this.organizationMemberRepository.findOne({
      where: {
        userId: user.id,
        organizationId: createCertificateCollection.organizationId,
      },
    });
    if (isNil(organizationMember)) {
      throw new Error('User is not in this organization');
    }
    const certificateTemplate =
      await this.certificateTemplateRepository.findOne({
        where: {
          id: createCertificateCollection.templateId,
        },
      });
    if (isNil(certificateTemplate)) {
      throw new Error('Certificate template is not exist');
    }
    const certMetadata = createCertificateCollection.metadata;
    const certificate = new Certificate();
    certificate.metadata = { ...certMetadata, certificate: 'socert' };
    certificate.template = certificateTemplate;
    certificate.organizationId = createCertificateCollection.organizationId;
    certificate.creators = certMetadata.creators;
    await this.certificateRepository.save(certificate);
    const metadata_path = `/metadata/collection/${certificate.id}.json`;
    return { certificateId: certificate.id, metadata_path: metadata_path };
  }

  async updateCertificateAddress(certificateId, nftAddress) {
    const certificate = await this.certificateRepository.findOne({
      where: {
        id: certificateId,
      },
    });
    if (isNil(certificate)) {
      throw new Error('Certificate is not exist');
    }
    certificate.address = nftAddress;
    await this.certificateRepository.save(certificate);
  }

  async getCertificateById(request, certificateId: string) {
    const { user } = request;
    const certificate = await this.certificateRepository.findOne({
      where: {
        id: certificateId,
      },
    });
    if (isNil(certificate)) {
      throw new Error('Certificate is not exist');
    }
    const organizationMember = await this.organizationMemberRepository.findOne({
      where: {
        userId: user.id,
        organizationId: certificate.organizationId,
      },
    });
    if (isNil(organizationMember)) {
      throw new Error('User is not in this organization');
    }
    return certificate;
  }

  async getCertificateByAddress(request, certificateAddress: string) {
    const { user } = request;
    const certificate = await this.certificateRepository.findOne({
      where: {
        address: certificateAddress,
      },
    });
    if (isNil(certificate)) {
      throw new Error('Certificate is not exist');
    }
    const organizationMember = await this.organizationMemberRepository.findOne({
      where: {
        userId: user.id,
        organizationId: certificate.organizationId,
      },
    });
    if (isNil(organizationMember)) {
      throw new Error('User is not in this organization');
    }
    return certificate;
  }

  async createCertificateMember(request, certificateAddress, members) {
    const { user } = request;
    const certificate = await this.certificateRepository.findOne({
      where: {
        address: certificateAddress,
      },
    });
    if (isNil(certificate)) {
      throw new Error('Certificate is not exist');
    }
    const organizationMember = await this.organizationMemberRepository.findOne({
      where: {
        userId: user.id,
        organizationId: certificate.organizationId,
      },
    });
    if (isNil(organizationMember)) {
      throw new Error('User is not in this organization');
    }
    const certificateMembers = [];

    const collection = await this.certificateRepository.findOne({ where: { address: members[0].collectionAddress } });


    members.map(async (member) => {
      const certificateMember = new CertificateMember();
      certificateMember.collectionAddress = certificate.address;

      certificateMember.name = `${certificate.metadata.name}-${member.name}`;
      certificateMember.canvas = certificate.template;
      const creators = collection.metadata.creators.map((creator) => { if(!isNil(creator)) return ({ address: creator, share: 100 }) });
      const { wallet_address, ...data } = member;
      const image = `${SITE_URL}/image/certificate/${certificateMember.id}.png`;
      const metadata = {
        ...data, symbol: 'SOCERT', image: image,
        seller_fee_basis_points: 0,
        properties: {
          creators: creators,
          files: [{
            uri: image,
            type: 'image/png'
          }]
        }
      };
      certificateMember.metadata = metadata;
      certificateMembers.push(certificateMember);
    });
    await this.certificateMemberRepository.save(certificateMembers);

    // const certificate = await this.certificateRepository.findOne({
    //   where: {
    //     address: certificateAddress,
    //   },
    // });
    // if (isNil(certificate)) {
    //   throw new Error('Certificate is not exist');
    // }
    // const organizationMember = await this.organizationMemberRepository.findOne({
    //   where: {
    //     userId: user.id,
    //     organizationId: certificate.organizationId,
    //   },
    // });
    // if (isNil(organizationMember)) {
    //   throw new Error('User is not in this organization');
    // }
    // return certificate;
  }

  async getCertificateMember(certificateAddress: string) {
    return await this.certificateMemberRepository.find({
      where: {
        collectionAddress: certificateAddress,
      },
    });
  }
}
