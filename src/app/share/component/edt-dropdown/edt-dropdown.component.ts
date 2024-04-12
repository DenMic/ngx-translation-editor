import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edt-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './edt-dropdown.component.html',
  styleUrl: './edt-dropdown.component.css',
})
export class EdtDropdownComponent implements OnDestroy {
  private overlay: Overlay = inject(Overlay);
  private vcr: ViewContainerRef = inject(ViewContainerRef);

  templateRef = viewChild.required<TemplateRef<any>>('templateRef');

  target = input.required<ElementRef | HTMLElement | any>();
  title = input<string>();
  showTitle = input<boolean>(false);

  private overlayRef?: OverlayRef;
  private subscriptions: Subscription[] = [];

  public show() {
    if (this.overlayRef?.hasAttached()) {
      this.close();
      return;
    }

    if (!this.target) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.target())
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    // Create and configure overlay
    this.overlayRef = this.overlay.create({
      // Position strategy defines where popup will be displayed
      positionStrategy: positionStrategy,

      // Popup reposition on scroll
      scrollStrategy: this.overlay.scrollStrategies.reposition(),

      // Display backdrop
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Put template to a portal
    const periodSelectorPortal = new TemplatePortal(
      this.templateRef(),
      this.vcr
    );

    // Attach the portal to the overlay
    this.overlayRef.attach(periodSelectorPortal);

    this.subscriptions.push(
      this.overlayRef.backdropClick().subscribe(() => {
        this.close();
      })
    );
    this.subscriptions.push(
      this.overlayRef.detachments().subscribe(() => {
        this.close();
      })
    );
  }

  public close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }
}
