import { Test, TestingModule } from '@nestjs/testing';
import { GlobalModule } from '@/modules/global.module';
import { AuthService } from '@/common/providers/auth.service';
import { JwtStrategy } from '@/common/providers/jwt.strategy';
import { EmployeeRepository } from '@/resources/repositories/employee.repository';
import { EmployeeSelectSql } from '@/resources/repositories/sql/employee-select.sql';

describe('JwtStrategy', () => {
  let provider: JwtStrategy;

  beforeEach(async () => {
    process.env.REFRESH_TOKEN_PRIVATE_KEY =
      'MIIEjwIBAAKB/gCubyIheQXH5YI8+X7lkKoazy2O8B/W+bY7nZXLk4C058Vv5OREE6z9OBPdyPXovhPeNG7Ld9IS4udj4RFakr//usTYJdZhB0zRujkRbWCP67euH9sEsgcXYgnTxW4jUSRSOFY8H+m5I+msGBA444K6n6MSh4GRif1/M5Q+MS3OT202QAbNQTGY0nv+dqnAFLYh7apy+n0nYaAwXLFi8+SIP76Ssb+mg0kiwl5mxtX/d50TG/yZ2RjkgaTv91aMgMszKFeUxVMT6mNa0+gtxk29/4QKjZE7VBtmb88Ica6fNdBWjYR18XZTTPyYEREN2AQHRv5ckrJ9kytCifrdAgMBAAECgf4AhWZoa8DqMt3KpGcKLPZdoPMgnFf3gainPSBfFrlPjQpTbCdYitehTGY+izbNGZmECEOBGAoill8BJtlRNDtWqnRjZgpJ0RqMHTiVvEYxut9CMeAa15Ru5+sKKPKsMEY1yMtc585gKD7Wzc35WghkSeUcCWeoJ22oeEcx7/4cPZlrYGLI8iHvTWk/eMhun+tbHupr5QwIr60g5qND+wKJWRxxZ1smCUZZbh3Gg3/KV2GcoHgNkW9I0tDdeyCoAvIEspclFJcshOIvvCMyj9QG6rVIMjcINBuSm/2Z/o3yc7fdqH0zybN6UW4acvOCITpN5iB2zZGkCdgegTsC4QJ/DeMj/SF+SB52x1T7fSYUI00/jcLpW5CY8w4+rXIVG6Ys1ZXyrJzAZdUOL41WW25tqw+pBeHzkg38klyD20cRSEvPjZMbJLUCzqGMIFbtxqVGoN6aC74qq1eOnmAsogKPyq7EafvlPrrDNTphG7tc9NkFHqr7HkUI96H+rd8eXwJ/DI+LffCt7KpC7skSVLwi1FddB0mhq92K0gXnWxh8K3vzddTFOAceCjrnckA+q5LZ46XWs8GLIJJh+tCArWYr/tAjN+5GolfQ9wphTzsn/UNRPmjbaQOmk7n+DZDui6jaazbox/Eiohy7WLUYb6McZNqiEXBY0Xxb8xAlTOf4QwJ/BflrqCBalWgVrVdQAdz52N4Is1Hg1nV0d0vvhuqHTifFLfWeOsgMtUJdIfPp7Neq8maATnmQMYs21zhZuWHve2yx07QvfzEoDgDNqbP8AvNjWR2qo9ahwKigQF4blW8IsSdSdE3bp4rtI98Dm8yVBvi+DR19ft4wJ2hXijFsfQJ/CDMhLesTr18K6NUseVKELjiGC37e4tJykF64RLi8PqrhKXfn84Z57tW7R9N21gy83ybg/WII0A+flNvOVORRLjxz8UxEojBPwyXslouYtHXgsKxFJ83xTZjqp7KId3WYeMtUtUnOgSPeja9TL3W80H4FtPqxkLftUsSkhQsd/wJ/BlYqJVS6WUbzEbxtbxxVGhV1BPNq5cXjiGfzb3D+zGkmlhwp19X+UWkseftN3mR6sgJaJ8wVfHghRmLAEETPR2n7/rcBydXy9wNxO7gKuydOPGT3yCmnDAeXSrfv+5TL82MJh1Mzvdpe0DpG7lKUXHITWm1McgbKDuj68Khtng==';
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [
        AuthService,
        EmployeeRepository,
        EmployeeSelectSql,
        JwtStrategy,
      ],
    }).compile();

    provider = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
