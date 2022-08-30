import { ApiProperty } from '@nestjs/swagger';
import {
  IsUrl,
  IsOptional,
  IsArray,
  IsNotEmpty,
  IsAscii,
  IsISO8601,
  Length,
  IsEnum,
} from 'class-validator';
import { ESolanaNetwork } from '../../types/ESolanaNetwork';

export class SolanaCompleteChallengeResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    maxLength: 64,
    minLength: 8,
    description:
      '17-characters Alphanumeric string Secret Challenge ID used to identify this particular request. Is should be used at the backend of the calling service to identify the completed request.',
    example: 'fRyt67D3eRss3RrX',
    pattern: '^[a-zA-Z0-9]{8,64}$',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'RFC 4501 dns authority that is requesting the signing.',
    example: 'defi.finance',
    format: 'hostname',
  })
  @IsUrl({ require_protocol: false })
  domain: string;

  @ApiProperty({
    type: String,
    enum: ESolanaNetwork,
    required: true,
    example: ESolanaNetwork.MAINNET,
    description: 'The network where Contract Accounts must be resolved.',
  })
  @IsEnum(ESolanaNetwork)
  @IsNotEmpty()
  network: ESolanaNetwork;

  @ApiProperty({
    type: String,
    required: true,
    example: '26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo',
    description:
      'Solana public key with a length of 44 characters that is used to perform the signing',
  })
  @Length(44)
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: String,
    required: false,
    description:
      'Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.',
    example: 'Please confirm',
  })
  @IsOptional()
  @IsAscii()
  statement?: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'uri',
    example: 'https://defi.finance/',
    description:
      'RFC 3986 URI referring to the resource that is the subject of the signing (as in the __subject__ of a claim).',
  })
  @IsUrl({ require_protocol: true, require_tld: false })
  uri: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: false,
    example: '2020-01-01T00:00:00.000Z',
    description:
      'ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.',
  })
  @IsOptional()
  @IsISO8601()
  expirationTime?: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: false,
    example: '2020-01-01T00:00:00.000Z',
    description:
      'ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.',
  })
  @IsOptional()
  @IsISO8601()
  notBefore?: string;

  @ApiProperty({
    type: [String],
    required: false,
    example: ['https://docs.moralis.io/'],
    description:
      'List of information or references to information the user wishes to have resolved as part of authentication by the relying party. They are expressed as RFC 3986 URIs separated by `\n- `.',
  })
  @IsOptional()
  @IsArray()
  resources?: Array<string>;

  @ApiProperty({
    type: String,
    required: true,
    example: '1.0',
    description:
      'EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts must be resolved.',
  })
  version: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '0x1234567890abcdef0123456789abcdef1234567890abcdef',
  })
  @IsNotEmpty()
  nonce: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Unique identifier with a length of 66 characters',
    example:
      '0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1',
  })
  profileId: string;
}
