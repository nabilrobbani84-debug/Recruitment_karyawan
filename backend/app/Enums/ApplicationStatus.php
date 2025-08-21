<?php

namespace App\Enums;

enum ApplicationStatus: string
{
    case PENDING = 'pending';
    case REVIEWED = 'reviewed';
    case INTERVIEW = 'interview';
    case OFFERED = 'offered';
    case REJECTED = 'rejected';
    case HIRED = 'hired';
}