export type Books = {
  Books: Book[];
};

export type Book = {
  id: string;
  name: string;
  path: string;
};

export type BookDetails = {
  id: string;
  name: string;
  yearPublisher: string;
  publisher: string;
  idPublisher: number;
  description: string;
  addInformation: string;
  continent: string;
  idCountinent: string;
  country: string;
  idCountry: number;
  idSRF?: number;
  city: string;
  idCity: number;
  Authors: {
    idAuthor: number;
    surname: string;
    name: string;
    patrymic: string;
    entity: string;
  }[];
  Images: {
    idImg: number;
    path: string;
  }[];
};

export type FilterOptions = {
  Continent: {
    idContinent: string;
    continent: string;
  }[];
  Country: {
    idCountry: string;
    country: string;
  }[];
  City: {
    idCity: string;
    city: string;
  }[];
  FederalDistrict: {
    idFederalDistrict: string;
    federalDistrict: string;
  }[];
  SubjectRF: {
    idSubjectRF: string;
    subjectRF: string;
  }[];
  Publisher: {
    idPublisher: string;
    publisher: string;
  }[];
  Author: {
    idAuthor: string;
    surname: string;
    nameAuthor: string;
    patronymic: string;
    entity: string;
  }[];
};

type PageParams<T> = { params: T };

export type CatalogPagesParams = PageParams<{
  id: string;
}>;
