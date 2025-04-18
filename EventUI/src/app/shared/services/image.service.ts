import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  
import { EventImage } from '../models/eventImage.model';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // Maintain current image and when change emit new values to all subscribers
  selectedImage : BehaviorSubject<EventImage> = new BehaviorSubject<EventImage> ({
    id: '',
    fileExtension: '',
    title: '',
    fileName: '',
    url: ''
  });

  constructor(private http: HttpClient) { }

  uploadImage(file: File, fileName: string, title: string) : Observable<EventImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<EventImage>(`${environment.apiBaseUrl}/api/images`, formData);
  }

  getAllImages() : Observable<EventImage[]> {
    return this.http.get<EventImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  selectImage(image: EventImage) : void {
    this.selectedImage.next(image);
  }

  getSelectedImage() : Observable<EventImage> {
    return this.selectedImage.asObservable();
  }


}
