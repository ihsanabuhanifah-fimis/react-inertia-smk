<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;
use Inertia\Inertia;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::verifyEmailView(fn () => Inertia::render('EmailVerify'));
        Fortify::requestPasswordResetLinkView(function () {
            return Inertia::render('ForgotPassword');
        });
        Fortify::resetPasswordView(function ($request) {
            return Inertia::render('ResetPassword', ['request' => $request]);
        });
        Fortify::twoFactorChallengeView(function () {
            return Inertia::render('TwoFactorChallenge'); 
        });
        Fortify::confirmPasswordView(function (Request $request) {
            return Inertia::render('TwoFactorAuth', [
          
                'recovery' => $request->user()->two_factor_secret !== null ?   $request->user()->recoveryCodes() : [],
                'qrCode' => $request->user()->two_factor_secret !== null ?   $request->user()->twoFactorQrCodeSvg() : null,
                'password_confirm' => true
    
              
                
            ]);
        });

        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by($request->email.$request->ip());
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
